import { Space } from 'antd';
import React from 'react';
import Input from '../../components/Input/Input';

type Props = {};

const ResetPasswordContainer = (props: Props) => {
    return (
        <>
            <Input
                name="email"
                type="email"
                autocomplete="on"
                label="Số điện thoại/Email"
                required
                placeholder="Nhập số điện thoại / địa chỉ email"
            />
            <Space.Compact className="w-full mt-5">
                <Input
                    name="otp"
                    type="text"
                    autocomplete="off"
                    placeholder="Nhập mã xác thực"
                    required
                    className="opt-input border border-wh-gray py-2 pl-3 rounded w-full rounded-r-none max-h-[40px]"
                />
                <input
                    type="button"
                    className="opt-btn rounded primary max-h-[40px] py-2 px-6 font-medium text-base rounded-l-none cursor-pointer"
                    value={'Gửi mã'}
                />
            </Space.Compact>
            <input
                type="button"
                className="opt-btn rounded primary max-h-[40px] w-full mt-5 py-2 px-6 font-medium text-base cursor-pointer"
                value={'Xác nhận'}
            />
        </>
    );
};

export default ResetPasswordContainer;
