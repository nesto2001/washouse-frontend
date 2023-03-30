import { useState, useEffect } from 'react';
import { BudgetType } from '../../containers/CentersContainer/CentersContainer';
import { getCategoryOptions } from '../../repositories/ServiceCategoryRepository';

import { Option } from '../../types/Options';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Radio from '../RadioButton';

type Props = {
    sorting: string;
    setSorting: React.Dispatch<React.SetStateAction<string>>;
    servicesCheck: string[];
    setServicesCheck: React.Dispatch<React.SetStateAction<string[]>>;
    budgetRange: BudgetType;
    setBudgetRange: React.Dispatch<React.SetStateAction<BudgetType>>;
};

const Sidebar = ({ setSorting, setServicesCheck, setBudgetRange, servicesCheck, sorting, budgetRange }: Props) => {
    const [checkboxes, setCheckboxes] = useState<Option[]>([]);

    const radios: Option[] = [
        {
            value: 'location',
            label: 'Gần tôi',
        },
        {
            value: 'rating',
            label: 'Đánh giá',
        },
    ];

    const additions: Option[] = [
        {
            value: 'delivery',
            label: 'Vận chuyển',
        },
        {
            value: 'payment-online',
            label: 'Thanh toán trực tuyến',
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            return await getCategoryOptions();
        };
        fetchData().then((res) => {
            setCheckboxes(
                res.slice(1).map((data) => {
                    return {
                        label: data.name,
                        value: data.id,
                    };
                }),
            );
        });
    }, []);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        const sortType = selectedValue;
        setSorting(sortType);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setServicesCheck((prev) => {
            if (prev.includes(value)) {
                // If the value is already in the list, remove it
                return prev.filter((val) => val !== value);
            } else {
                // Otherwise, add it to the list
                return [...prev, value];
            }
        });
    };

    return (
        <div className="sidebar basis-1/6 pt-8 px-10 text-left h-screen">
            <div className="sidebar__sort">
                <div className="sidebar__section--header font-bold text-base mb-3 text-sub">Sắp xếp</div>
                <div className="sidebar__section--content">
                    <Radio name="sorting" optionsList={radios} defaultValue={sorting} onChange={handleRadioChange} />
                </div>
            </div>
            <hr className="my-5" />
            <div className="sidebar__budget">
                <div className="sidebar__section--header font-bold text-base mb-3 text-sub">Khoảng giá</div>
                <div className="sidebar__section--content">
                    <div className="budget__range--wrapper w-full flex justify-between gap-3 items-center text-base mb-4">
                        <input
                            type="number"
                            name="min-budget"
                            maxLength={9}
                            id=""
                            placeholder="đ - từ"
                            className="border pl-2 w-24 h-7"
                        />
                        <div className="border-[0.8px] w-3.5 h-0"></div>
                        <input
                            type="number"
                            name="max-budget"
                            maxLength={9}
                            id=""
                            placeholder="đ - đến"
                            className="border pl-2 w-24 h-7"
                        />
                    </div>
                    <div className="budget__range--action">
                        <Button type="sub" minWidth="100%">
                            Áp dụng
                        </Button>
                    </div>
                </div>
            </div>
            <hr className="my-5" />
            <div className="sidebar__service">
                <div className="sidebar__section--header font-bold text-base mb-3 text-sub">Dịch vụ</div>
                <div className="sidebar__section--content">
                    <Checkbox
                        name="services"
                        optionsList={checkboxes}
                        selectedValues={servicesCheck}
                        onChange={handleCheckboxChange}
                    />
                </div>
            </div>
            <hr className="my-5" />
            <div className="sidebar__service--extra">
                <div className="sidebar__section--header font-bold text-base mb-3 text-sub">Dịch vụ bổ sung</div>
                <div className="sidebar__section--content">
                    <Checkbox name="additions" optionsList={additions} />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
