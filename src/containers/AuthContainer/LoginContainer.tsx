import { useRef, useState } from 'react';
import WHButton from '../../components/Button';
import Input from '../../components/Input/Input';
import Google from '../../assets/images/google.png';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { BiErrorAlt } from 'react-icons/bi';
import { getMe, login } from '../../repositories/AuthRepository';

type Props = {};

const LoginContainer = () => {
    const [loginForm, setLoginForm] = useState({
        phone: '',
        password: '',
    });
    const [loginSMS, setLoginSMS] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        setIsFetching(true);
        if (loginForm.phone && loginForm.password) {
            const fetchData = async () => {
                return await login({ phone: loginForm.phone.trim(), password: loginForm.password.trim() });
            };
            fetchData().then((res) => {
                console.log(res);
                if (res.status == 200) {
                    localStorage.setItem('accessToken', res.data.data.accessToken);
                    const fetchData = async () => {
                        return await getMe();
                    };
                    fetchData().then((res) => {
                        setIsFetching(false);
                        localStorage.setItem('currentUser', JSON.stringify(res));
                        if (res.roleType.toLowerCase() === 'admin') {
                            navigate('/admin/dashboard');
                        } else {
                            navigate('/trung-tâm');
                        }
                    });
                } else {
                    setLoginError('Số điện thoại hoặc mật khẩu chưa chính xác!');
                }
            });
        } else {
            setLoginError('Vui lòng nhập đầy đủ thông tin đăng nhập!');
            setIsFetching(false);
        }
    };

    return (
        <>
            <div className="login__form--phone">
                <Input
                    label="Số điện thoại"
                    name="user_phone"
                    type="tel"
                    onChange={(e) => {
                        setLoginForm((prev) => ({ ...prev, phone: e.target.value }));
                    }}
                    value={loginForm.phone}
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
                        onChange={(e) => {
                            setLoginForm((prev) => ({ ...prev, password: e.target.value }));
                        }}
                        value={loginForm.password}
                        required
                        placeholder="Nhập mật khẩu"
                        autocomplete="on"
                    />
                </div>
            )}
            <div className={clsx('login__form--action', loginError ? 'mt-6' : 'mt-8')}>
                {loginError && (
                    <div className="mb-2">
                        <BiErrorAlt className="inline align-text-bottom text-red" size={20} />
                        <span className="text-red ml-1">{loginError}</span>
                    </div>
                )}
                <WHButton minWidth="100%" type="primary" onClick={handleSubmit}>
                    {isFetching ? (
                        <div
                            className={isFetching ? 'flex justify-center my-[7px] text-center dot-flashing' : ''}
                        ></div>
                    ) : loginSMS ? (
                        'Tiếp theo'
                    ) : (
                        'Đăng nhập'
                    )}
                </WHButton>
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
                <WHButton minWidth="100%" type="sub">
                    <>
                        <img className="max-w-[24px] inline-block mr-2" src={Google} alt="" />
                        Đăng nhập với Google
                    </>
                </WHButton>
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
