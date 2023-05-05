import { useEffect, useRef, useState } from 'react';
import WHButton from '../../components/Button';
import Input from '../../components/Input/Input';
import Google from '../../assets/images/google.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { BiErrorAlt } from 'react-icons/bi';
import { getMe, login, loginOTP, loginOTPStaff, loginStaff, sendOTPLogin } from '../../repositories/AuthRepository';
import { Form, Modal, message } from 'antd';
import Countdown, { CountdownApi, zeroPad } from 'react-countdown';
import OtpInput from '../../components/OTPInput/OtpInput';

type Props = {};

const StaffLoginContainer = () => {
    let { state } = useLocation();

    const backUrl = state && state.backUrl !== null ? state.backUrl : '';

    const [loginForm, setLoginForm] = useState({
        phone: '',
        password: '',
    });
    const [loginSMS, setLoginSMS] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>('');
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isOTPFetching, setIsOTPFetching] = useState<boolean>(false);
    const [openOTPModal, setOpenOTPModal] = useState(false);
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
    const handleSubmit = () => {
        setIsFetching(true);
        if (loginForm.phone && loginForm.password) {
            const fetchData = async () => {
                return await loginStaff({ phone: loginForm.phone.trim(), password: loginForm.password.trim() });
            };
            fetchData().then((res) => {
                if (res.data.statusCode === 10) {
                    setLoginError('Số điện thoại hoặc mật khẩu chưa chính xác!');
                    setIsFetching(false);
                    return;
                }
                if (res.status == 200) {
                    localStorage.setItem('accessToken', res.data.data.accessToken);
                    localStorage.setItem('refreshToken', res.data.data.refreshToken);
                    const fetchData = async () => {
                        return await getMe();
                    };
                    fetchData().then((res) => {
                        console.log(backUrl);
                        setIsFetching(false);
                        localStorage.setItem('currentUser', JSON.stringify(res));
                        if (backUrl) {
                            console.log(backUrl);
                            navigate(backUrl);
                        } else if (res.roleType.toLowerCase() === 'admin') {
                            navigate('/admin/dashboard');
                        } else if (res.roleType.toLowerCase() === 'manager') {
                            navigate('/provider/dashboard');
                        } else if (res.roleType.toLowerCase() === 'staff') {
                            navigate('/provider/staff/dashboard');
                        } else {
                            navigate('/provider/role');
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
        loginOTPStaff(loginForm.phone, otp)
            .then((res) => {
                message.success('Mã xác nhận chính xác, tiến hành đăng nhập');
                localStorage.setItem('accessToken', res.data.data.accessToken);
                localStorage.setItem('refreshToken', res.data.data.refreshToken);
                getMe().then((res) => {
                    setIsOTPFetching(false);
                    localStorage.setItem('currentUser', JSON.stringify(res));
                    if (backUrl) {
                        console.log(backUrl);
                        navigate(backUrl);
                    } else if (res.roleType.toLowerCase() === 'manager') {
                        navigate('/provider/dashboard');
                    } else if (res.roleType.toLowerCase() === 'staff') {
                        navigate('/provider/staff/dashboard');
                    } else {
                        navigate('/provider/role');
                    }
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
            <Form>
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
                    <WHButton
                        minWidth="100%"
                        type="primary"
                        fetching={isFetching}
                        onClick={loginSMS ? handleOTPLogin : handleSubmit}
                    >
                        {loginSMS ? 'Tiếp theo' : 'Đăng nhập'}
                    </WHButton>
                    <div
                        className={clsx(
                            loginSMS ? 'justify-end' : 'justify-between',
                            'login__form--addition flex mt-2',
                        )}
                    >
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
                </div>
                <div className="login__form--redirect mt-3">
                    <h3 className="font-semibold">
                        Bạn chưa có tài khoản?{' '}
                        <span className="text-primary font-bold">
                            <Link to="/provider/register">Đăng ký</Link>
                        </span>{' '}
                        ngay!
                    </h3>
                </div>
            </Form>
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

export default StaffLoginContainer;
