import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Datepicker from 'tailwind-datepicker-react';
import Button from '../../components/Button';
import Input from '../../components/Input/Input';
import Radio from '../../components/RadioButton';
import { Option } from '../../types/Options';

type Props = {};

const ChangePasswordContainer = () => {
    return (
        <div className="grid grid-cols-4 items-center gap-y-2">
            <div className="col-span-1 text-right mr-6">Mật khẩu hiện tại</div>
            <div className="col-span-2">
                <Input type="text" name="user-fn"></Input>
            </div>
            <div className="col-span-1 ml-6">Quên mật khẩu?</div>

            <div className="col-span-1 text-right mr-6">Mật khẩu mới</div>
            <div className="col-span-2">
                <Input type="text" name="user-fn"></Input>
            </div>
            <div className="col-span-1"></div>

            <div className="col-span-1 text-right mr-6">Xác nhận mật khẩu</div>
            <div className="col-span-2">
                <Input type="text" name="user-fn"></Input>
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-1"></div>
            <div className="col-span-3 mt-6">
                <Button type="primary" minWidth="124px">
                    Đổi mật khẩu
                </Button>
            </div>
        </div>
    );
};

export default ChangePasswordContainer;