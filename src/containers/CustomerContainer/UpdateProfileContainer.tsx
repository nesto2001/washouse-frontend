import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Datepicker from 'tailwind-datepicker-react';
import Button from '../../components/Button';
import Input from '../../components/Input/Input';
import Radio from '../../components/RadioButton';
import { Option } from '../../types/Options';

type Props = {};

const UpdateProfileContainer = () => {
    const options = {
        title: '',
        autoHide: false,
        todayBtn: false,
        clearBtn: false,
        maxDate: new Date(),
        minDate: new Date('1950-01-01'),
        theme: {
            background: '',
            todayBtn: '',
            clearBtn: '',
            icons: 'text-sm',
            text: '',
            disabledText: 'text-gray-300',
            input: 'bg-white border-wh-gray rounded',
            inputIcon: '',
            selected: '',
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => (
                <span>
                    <FaAngleLeft />
                </span>
            ),
            next: () => (
                <span>
                    <FaAngleRight />
                </span>
            ),
        },
        datepickerClassNames: 'top-50 pt-1',
        defaultDate: new Date(),
        language: 'vi',
    };

    const [show, setShow] = useState<boolean>(false);
    const handleChange = (selectedDate: Date) => {
        console.log(selectedDate);
    };
    const handleClose = (state: boolean) => {
        setShow(state);
    };

    const genderOptions: Option[] = [
        {
            label: 'Nam',
            value: 0,
        },
        {
            label: 'Nữ',
            value: 1,
        },
        {
            label: 'Khác',
            value: 2,
        },
    ];

    return (
        <div className="grid grid-cols-4 items-center gap-y-2">
            <div className="col-span-1 text-right mr-6">Họ</div>
            <div className="col-span-1">
                <Input type="text" name="user-fn"></Input>
            </div>
            <div className="col-span-2 grid grid-cols-4 items-center">
                <div className="col-span-1 ml-3 w-">Tên</div>
                <div className="col-span-3">
                    <Input type="text" name="user-fn"></Input>
                </div>
            </div>

            <div className="col-span-1 text-right mr-6">Số điện thoại</div>
            <div className="col-span-3 py-2">********21</div>
            <div className="col-span-1 text-right mr-6">Email</div>
            <div className="col-span-3 py-2">********@gmail.com</div>
            <div className="col-span-1 text-right mr-6">Ngày sinh</div>
            <div className="col-span-3 grid grid-cols-5">
                <div className="col-span-3 max-w-[192px]">
                    <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
                </div>
                <div className="col-span-2"></div>
            </div>
            <div className="col-span-1 text-right mr-6">Giới tính</div>
            <div className="col-span-3 py-2 flex items-center gap-6">
                <Radio optionsList={genderOptions} name="gender" inline></Radio>
            </div>
            <div className="col-span-1 text-right mr-6"></div>
            <div className="col-span-3 mt-6">
                <Button type="primary" minWidth="124px">
                    Lưu
                </Button>
            </div>
        </div>
    );
};

export default UpdateProfileContainer;
