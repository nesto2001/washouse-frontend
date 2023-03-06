import { useRef, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input/Input';
import Google from '../../assets/images/google.png';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

type Props = {};

const LoginContainer = () => {
    const [loginSMS, setLoginSMS] = useState<boolean>(false);
    const userPhoneRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const phone = userPhoneRef.current?.value ?? '';
        const password = passwordRef.current?.value ?? '';
        console.log(phone, password);
    };

    return (
        <>
            <div className="login__form--phone">
                <Input
                    label="Số điện thoại"
                    name="user_phone"
                    type="tel"
                    inputRef={userPhoneRef}
                    required
                    placeholder="Nhập số điện thoại"
                />
            </div>
            {!loginSMS && (
                <div className="login__form--password mt-3">
                    <Input
                        label="Mật khẩu"
                        name="user_password"
                        type="password"
                        inputRef={passwordRef}
                        required
                        placeholder="Nhập mật khẩu"
                        autocomplete="on"
                    />
                </div>
            )}
            <div className="login__form--action mt-8">
                <Button minWidth="100%" type="primary" onClick={handleSubmit}>
                    {loginSMS ? 'Tiếp theo' : 'Đăng nhập'}
                </Button>
                <div className={clsx(loginSMS ? 'justify-end' : 'justify-between', 'login__form--addition flex mt-2')}>
                    {loginSMS ? (
                        <h4
                            className="text-primary text-sm cursor-pointer"
                            onClick={(e) => {
                                setLoginSMS(false);
                            }}
                        >
                            Đăng nhập với mật khẩu
                        </h4>
                    ) : (
                        <>
                            <Link to="/account/reset" className="text-primary text-sm">
                                Quên mật khẩu
                            </Link>
                            <h4
                                className="text-primary text-sm cursor-pointer"
                                onClick={(e) => {
                                    setLoginSMS(true);
                                }}
                            >
                                Đăng nhập với SMS
                            </h4>
                        </>
                    )}
                </div>
                <div className="action--separator flex justify-between items-center my-3">
                    <div className="border-b border-wh-gray w-full"></div>
                    <div className="px-2 text-sub-gray font-medium">hoặc</div>
                    <div className="border-b border-wh-gray w-full"></div>
                </div>
                <Button minWidth="100%" type="sub">
                    <>
                        <img className="max-w-[24px] inline-block mr-2" src={Google} alt="" />
                        Đăng nhập với Google
                    </>
                </Button>
            </div>
            <div className="login__form--redirect mt-3">
                <h3 className="font-semibold">
                    Bạn chưa có tài khoản?{' '}
                    <span className="text-primary font-bold">
                        <Link to="/register">Đăng ký</Link>
                    </span>{' '}
                    ngay!
                </h3>
            </div>
        </>
    );
};

export default LoginContainer;
