import { useEffect, useRef, useState } from 'react';
import WHButton from '../../components/Button';
import Input from '../../components/Input/Input';
import Google from '../../assets/images/google.png';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { BiErrorAlt } from 'react-icons/bi';
import {
    getMe,
    login,
    loginGoogle,
    loginOTP,
    sendOTP,
    sendOTPLogin,
    verifyOTP,
} from '../../repositories/AuthRepository';
import Loading from '../../components/Loading/Loading';
import { Button, Modal, message } from 'antd';
import OtpInput from '../../components/OTPInput/OtpInput';
import Countdown, { CountdownApi, zeroPad } from 'react-countdown';
import { UserModel } from '../../models/User/UserModel';

type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginContainer = ({ setLoading }: Props) => {
    const [loginForm, setLoginForm] = useState({
        phone: '',
        password: '',
    });
    const userJson = localStorage.getItem('currentUser');
    const [loginSMS, setLoginSMS] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isOTPFetching, setIsOTPFetching] = useState<boolean>(false);
    const [openOTPModal, setOpenOTPModal] = useState(false);
    const [user, setUser] = useState<UserModel | null>(userJson && JSON.parse(userJson));
    const [userRole, setUserRole] = useState(user?.roleType.toLowerCase() ?? '');
    const [otp, setOtp] = useState('');
    const onOTPChange = (value: string) => setOtp(value);
    const navigate = useNavigate();
    const [countdownApi, setCountdownApi] = useState<CountdownApi | null>(null);

    const handleStartClick = (): void => {
        if (countdownApi) {
            countdownApi.start();
        }
    };

    const setRef = (countdown: Countdown | null): void => {
        if (countdown) {
            setCountdownApi(countdown.getApi());
        }
    };

    useEffect(() => {
        if (user && userRole) {
            userRole === 'customer' && navigate('/trung-tam');
            userRole === 'admin' && navigate('/admin/dashboard');
        }
    }, []);

    const handleSubmit = () => {
        setIsFetching(true);
        if (loginForm.phone && loginForm.password) {
            login({ phone: loginForm.phone.trim(), password: loginForm.password.trim() }).then((res) => {
                if (res.status === 200 && res.data.message.toLowerCase().includes('success')) {
                    localStorage.setItem('accessToken', res.data.data.accessToken);
                    localStorage.setItem('refreshToken', res.data.data.refreshToken);
                    const fetchData = async () => {
                        return await getMe();
                    };
                    fetchData().then((res) => {
                        setIsFetching(false);
                        localStorage.setItem('currentUser', JSON.stringify(res));
                        if (res.roleType.toLowerCase() === 'admin') {
                            navigate('/admin/dashboard');
                        } else {
                            navigate('/trung-tam');
                        }
                    });
                } else {
                    setLoginError('Số điện thoại hoặc mật khẩu chưa chính xác!');
                    setIsFetching(false);
                }
            });
        } else {
            setLoginError('Vui lòng nhập đầy đủ thông tin đăng nhập!');
            setIsFetching(false);
        }
    };

    const handleGoogleLogin = () => {
        const redirectUri = `${window.location.origin}/login`;
        const scope =
            'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
        const clientId = '1020768387339-ilabkav1tjbbeclvqfvlu5as9s1fdnog.apps.googleusercontent.com';

        const url =
            `https://accounts.google.com/o/oauth2/auth?` +
            `client_id=${clientId}&` +
            `redirect_uri=${redirectUri}&` +
            `response_type=code&` +
            `scope=${scope}`;
        // window.open(url, '', 'width=500,height=700');
        window.location = url as unknown as Location;
    };

    const handleOTPLogin = () => {
        setIsFetching(true);
        if (loginForm.phone) {
            setIsFetching(false);
            sendOTPLogin(loginForm.phone).then((res) => {
                message.success(`Đã gửi mã xác nhận đến SĐT ${loginForm.phone}`);
                setOpenOTPModal(true);
            });
        } else {
            setLoginError('Vui lòng nhập đầy đủ thông tin đăng nhập!');
            setIsFetching(false);
        }
    };

    const handleResendOTP = () => {
        if (loginForm.phone) {
            sendOTPLogin(loginForm.phone).then((res) => {
                message.success(`Đã gửi lại mã xác nhận đến SĐT ${loginForm.phone}`);
                handleStartClick();
            });
        } else {
            setLoginError('Vui lòng nhập đầy đủ thông tin đăng nhập!');
        }
    };

    const handleVerifyOTP = () => {
        setIsOTPFetching(true);
        loginOTP(loginForm.phone, otp)
            .then((res) => {
                message.success('Mã xác nhận chính xác, tiến hành đăng nhập');
                localStorage.setItem('accessToken', res.data.data.accessToken);
                localStorage.setItem('refreshToken', res.data.data.refreshToken);
                getMe().then((res) => {
                    setIsOTPFetching(false);
                    localStorage.setItem('currentUser', JSON.stringify(res));
                    navigate('/trung-tam');
                });
            })
            .catch(() => {
                message.error('Mã xác nhận không chính xác');
            })
            .finally(() => {
                setIsOTPFetching(false);
            });
    };

    const renderer = ({ seconds, completed }: { seconds: number; completed: boolean }) => {
        if (completed) {
            return (
                <span onClick={handleResendOTP} className="font-medium text-primary hover:text-ws-primary-hover">
                    Gửi lại mã
                </span>
            );
        } else {
            return <span className="font-medium text-ws-gray">({zeroPad(seconds)})</span>;
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
                        if (loginError) {
                            setLoginError('');
                        }
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
                <WHButton
                    minWidth="100%"
                    type="primary"
                    onClick={loginSMS ? handleOTPLogin : handleSubmit}
                    fetching={isFetching}
                >
                    {loginSMS ? 'Tiếp theo' : 'Đăng nhập'}
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
                <WHButton minWidth="100%" type="sub" onClick={handleGoogleLogin}>
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
            <Modal
                title="Nhập mã xác nhận OTP"
                open={openOTPModal}
                okText="Xác nhận"
                onCancel={() => {
                    setOtp('');
                    setOpenOTPModal(false);
                }}
                destroyOnClose={true}
                cancelText="Hủy"
                cancelButtonProps={{ style: { background: 'white' } }}
                width={300}
                centered
                footer={false}
            >
                <div className="my-6">
                    <OtpInput value={otp} valueLength={4} onChange={onOTPChange} />
                </div>
                <div className="w-full text-right">
                    Chưa nhận được mã? <Countdown date={Date.now() + 20000} renderer={renderer} ref={setRef} />
                </div>
                <WHButton
                    type="primary"
                    size="small"
                    onClick={handleVerifyOTP}
                    className="w-full mt-1"
                    disable={otp.length < 4}
                    fetching={isOTPFetching}
                >
                    Xác nhận
                </WHButton>
            </Modal>
        </>
    );
};

export default LoginContainer;
