import { Space } from 'antd';
import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/washouse-notag.png';
import WHButton from '../../components/Button';
import Input from '../../components/Input/Input';
import ResetPasswordContainer from '../../containers/AuthContainer/ResetPasswordContainer';
import './ResetPasswordPage.scss';

type Props = {};

const ResetPasswordPage = () => {
    return (
        <div className="reset__page--wrapper overflow-y-hidden overflow-x-hidden">
            <div className="h-screen w-full overflow-y-hidden relative">
                <div className="absolute top-0 left-0 bottom-0 right-0 mx-auto my-auto h-[600px] bg-white max-w-[720px] rounded-2xl px-4 py-6 flex flex-col items-center justify-start">
                    <div className="reset__page--nav absolute top-0 left-0">
                        <Link to="/login">
                            <FaAngleLeft className="ml-6 mt-6 cursor-pointer" size={40} />
                        </Link>
                    </div>
                    <div className="max-w-[200px] mt-6">
                        <img src={Logo} alt="" />
                    </div>
                    <div className="reset__page--header font-bold text-4xl mt-3">Lấy lại mật khẩu</div>
                    <div className="reset__page--container text-left mt-10 w-[400px]">
                        <ResetPasswordContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
