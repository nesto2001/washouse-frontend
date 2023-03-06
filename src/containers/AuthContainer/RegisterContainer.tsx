import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Google from '../../assets/images/google.png';
import Button from '../../components/Button';
import Input from '../../components/Input/Input';

type Props = {};

const RegisterContainer = () => {
    const userPhoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const cfPasswordRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const phone = userPhoneRef.current?.value ?? '';
        const password = passwordRef.current?.value ?? '';
        console.log(phone, password);
    };

    return (
        <>
            <div className="register__form--phone">
                <Input
                    label="Số điện thoại"
                    name="user_phone"
                    type="tel"
                    inputRef={userPhoneRef}
                    required
                    placeholder="Nhập số điện thoại"
                />
            </div>

            <div className="register__form--password mt-3">
                <Input
                    label="Email"
                    name="user_password"
                    type="password"
                    inputRef={emailRef}
                    required
                    placeholder="Nhập email"
                    autocomplete="on"
                />
            </div>
            <div className="register__form--password mt-3">
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
            <div className="register__form--password mt-3">
                <Input
                    label="Xác nhận mật khẩu"
                    name="user_password"
                    type="password"
                    inputRef={cfPasswordRef}
                    required
                    placeholder="Xác nhận mật khẩu"
                    autocomplete="on"
                />
            </div>
            <div className="register__form--tspp text-xs mt-3">
                Bằng việc đăng ký, bạn đã đồng ý với Washouse về{' '}
                <Link to="/terms" className="text-primary">
                    Điều khoản, điều kiện sử dụng dịch vụ
                </Link>{' '}
                {/* &{' '}
                 <Link to="/privacy" className="text-primary">
                    Chính sách bảo mật
                </Link> */}
            </div>
            <div className="register__form--action mt-3">
                <Button minWidth="100%" type="primary" onClick={handleSubmit}>
                    Đăng ký
                </Button>
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
            <div className="register__form--redirect mt-3">
                <h3 className="font-semibold">
                    Bạn đã có tài khoản?{' '}
                    <span className="text-primary font-bold">
                        <Link to="/login">Đăng nhập</Link>
                    </span>{' '}
                </h3>
            </div>
        </>
    );
};

export default RegisterContainer;
