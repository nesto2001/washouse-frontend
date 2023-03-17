import React from 'react';
import './ErrorScreen.scss';
import Error from '../../assets/images/error.png';
import Button from '../Button';

type Props = {};

const ErrorScreen = (props: Props) => {
    return (
        <div className="w-full flex flex-col justify-center items-center p-12">
            <div className="font-bold text-3xl">Rất tiếc, trang này không tồn tại</div>
            <div className="font-bold text-xl mt-4">
                Liên kết bạn đã nhấp vào có thể bị hỏng, hoặc trang này có thể đã được gỡ bỏ.
            </div>
            <div className="w-5/12 max-w-[664px] my-6">
                <img src={Error} alt="" />
            </div>
            <div className=" mt-5">
                <Button link="/centers" type="primary">
                    Quay lại trang chủ
                </Button>
            </div>
        </div>
    );
};

export default ErrorScreen;
