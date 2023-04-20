import React, { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { verifyStaff } from '../../../repositories/StaffRepository';
import { getMe } from '../../../repositories/AuthRepository';
import { AxiosError } from 'axios';
import { Button, Result, message } from 'antd';
import { Response } from '../../../models/CommonModel';
import Expired from '../../../assets/images/empty-data.png';

type Props = {};

interface VerifyMessage {
    code: number;
    title: ReactNode;
    message?: ReactNode;
    extra?: ReactNode;
    resultImg: string | ReactNode;
}

const StaffVerificationContainer = (props: Props) => {
    const [verifyMessage, setVerifyMessage] = useState<VerifyMessage>({
        code: 0,
        message: '',
        resultImg: '',
        title: '',
        extra: '',
    });
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    useEffect(() => {
        getMe().catch((err) => {
            navigate('/provider/login', { state: { backUrl: location.pathname + location.search } });
        });
        if (code) {
            verifyStaff(code)
                .then((res) => {
                    setVerifyMessage({
                        code: 200,
                        title: 'Xác nhận nhân viên thành công',
                        message: 'Nhấn vào nút bên dưới để được chuyển hướng đến trang quản lý',
                        extra: (
                            <Link to="/provider/staff/dashboard">
                                <Button type="primary" size="large">
                                    Trang quản lý
                                </Button>
                            </Link>
                        ),
                        resultImg: <Result status={'success'} />,
                    });
                })
                .catch((err: AxiosError<Response<null>>) => {
                    if (err.response?.status === 403) {
                        message.error('Mã xác nhận không trùng khớp với tài khoản đăng nhập, vui lòng đăng nhập lại.');
                        navigate('/provider/login', { state: { backUrl: location.pathname + location.search } });
                    }
                    if (err.response?.status === 400) {
                        const { data } = err.response;
                        if (data.message === 'Expire time for this code') {
                            setVerifyMessage({
                                code: 400,
                                title: 'Mã xác nhận đã hết hạn',
                                message: 'Vui lòng liên hệ quản lý của bạn để gửi lại mã xác nhận',
                                resultImg: <img src={Expired} alt="" className="w-[180px]" />,
                                extra: (
                                    <Link to="/">
                                        <Button type="primary" size="large">
                                            Về trang chủ
                                        </Button>
                                    </Link>
                                ),
                            });
                        }
                    }
                    console.log(err);
                });
        }
    }, [code]);

    return (
        <div className="h-screen relative">
            <div
                className="absolute top-0 left-0 bottom-0 right-0 h-96 my-auto bg-wh-lightgray flex justify-center"
                style={{ boxShadow: '0 0 0 9999px #f2f3f3' }}
            >
                <div className="bg-white rounded-2xl w-1/2 border border-wh-gray flex justify-center items-center flex-col">
                    <div className="flex justify-center">{verifyMessage.resultImg}</div>
                    <div className="font-medium text-xl mt-4">{verifyMessage.title}</div>
                    <div className="mt-1">{verifyMessage.message}</div>
                    <div className="action mt-5">{verifyMessage.extra}</div>
                </div>
            </div>
        </div>
    );
};

export default StaffVerificationContainer;
