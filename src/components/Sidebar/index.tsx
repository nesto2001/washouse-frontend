import { useState, useEffect } from 'react';

import { Option } from '../../types/Options';
import Button from '../Button';
import Checkbox from '../Checkbox';
import Radio from '../RadioButton';

type Props = {
    sorting: string;
    setSorting: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar = ({ setSorting, sorting }: Props) => {
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

    const checkboxes: Option[] = [
        {
            value: 1,
            label: 'Giặt sấy',
        },
        {
            value: 2,
            label: 'Giặt hấp',
        },
        {
            value: 3,
            label: 'Giặt mền, topper',
        },
        {
            value: 4,
            label: 'Giặt gấu bông',
        },
        {
            value: 5,
            label: 'Giặt rèm',
        },
        {
            value: 6,
            label: 'Ủi đồ',
        },
        {
            value: 7,
            label: 'Loại bỏ vết bẩn',
        },
    ];

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        const sortType = selectedValue;
        setSorting(sortType);
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
                    <Checkbox name="services" optionsList={checkboxes} />
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
