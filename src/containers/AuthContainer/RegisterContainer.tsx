import { Form } from 'antd';
import { RuleObject } from 'antd/es/form';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Google from '../../assets/images/google.png';
import WHButton from '../../components/Button';
import Input from '../../components/Input/Input';
import { RegisterRequest } from '../../models/Account/RegisterRequest';
import { getMe, login, registerCustomer } from '../../repositories/AuthRepository';
import { RegisterErrors } from '../../types/RegisterErrors';
import { BiErrorAlt } from 'react-icons/bi';

type Props = {};

const RegisterContainer = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const [registerData, setRegisterData] = useState<RegisterRequest>({
        phone: '',
        email: '',
        password: '',
        confirmPass: '',
    });

    const onFinish = (values: any) => {
        const isAllFieldsFilled = Object.values(registerData).every((value) => value);
        if (isAllFieldsFilled) {
            const registerCus = async () => {
                return await registerCustomer(registerData);
            };
            registerCus()
                .then((res) => {
                    console.log(res);
                    if (res.status == 200 && res.data != null) {
                        const loginCustomer = async () => {
                            return await login({ phone: registerData.phone, password: registerData.password });
                        };
                        loginCustomer().then((res) => {
                            console.log(res);
                            if (res.status == 200) {
                                localStorage.setItem('accessToken', res.data.data.accessToken);
                                const fetchData = async () => {
                                    return await getMe();
                                };
                                fetchData().then((res) => {
                                    localStorage.setItem('currentUser', JSON.stringify(res));
                                    navigate('/trung-tam');
                                });
                            } else {
                                console.log('lỗi login');
                            }
                        });
                    }
                })
                .catch(() => {
                    setError('Số điện thoại hoặc email đã tồn tại');
                });
        }
        setIsFetching(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        setIsFetching(false);
    };

    const validatePassword = async (_: RuleObject, value: string) => {
        const formValue = form.getFieldsValue();
        if (value && value !== formValue.user_password) {
            throw new Error('Mật khẩu không trùng khớp');
        }
    };

    return (
        <Form
            form={form}
            name="register"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onFocus={() => setError(undefined)}
        >
            <div className="register__form--phone">
                <Form.Item
                    name="phone"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại của bạn' },
                        { len: 10, message: 'Số điện thoại thông thường có 10 số' },
                    ]}
                    validateTrigger={'onBlur'}
                >
                    <Input
                        label="Số điện thoại"
                        name="user_phone"
                        type="tel"
                        value={registerData.phone}
                        onChange={(e) => {
                            setRegisterData((prevData) => ({ ...prevData, phone: e.target.value }));
                        }}
                        placeholder="Nhập số điện thoại"
                    />
                </Form.Item>
            </div>

            <div className="register__form--email">
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập địa chỉ email của bạn' },
                        {
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                            message: 'Vui lòng nhập đúng định dạng email',
                        },
                    ]}
                    validateTrigger={'onBlur'}
                >
                    <Input
                        label="Email"
                        name="user_password"
                        value={registerData.email}
                        type="email"
                        onChange={(e) => {
                            setRegisterData((prevData) => ({ ...prevData, email: e.target.value }));
                        }}
                        placeholder="Nhập email"
                        autocomplete="on"
                    />
                </Form.Item>
            </div>
            <div className="register__form--password">
                <Form.Item
                    name="user_password"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu của bạn' },
                        { min: 6, message: 'Vui lòng nhập ít nhất 6 ký tự' },
                    ]}
                    validateTrigger={'onBlur'}
                >
                    <Input
                        label="Mật khẩu"
                        name="user_password"
                        type="password"
                        onChange={(e) => {
                            setRegisterData((prevData) => ({ ...prevData, password: e.target.value }));
                        }}
                        placeholder="Nhập mật khẩu"
                    />
                </Form.Item>
            </div>
            <div className="register__form--cfpassword">
                <Form.Item
                    name="confirmPass"
                    rules={[{ required: true, message: 'Vui lòng xác nhận mật khẩu' }, { validator: validatePassword }]}
                >
                    <Input
                        label="Xác nhận mật khẩu"
                        name="user_password"
                        type="password"
                        onChange={(e) => {
                            setRegisterData((prevData) => ({ ...prevData, confirmPass: e.target.value }));
                        }}
                        required
                        placeholder="Xác nhận mật khẩu"
                    />
                </Form.Item>
            </div>
            {error && (
                <div className="mb-2">
                    <BiErrorAlt className="inline align-text-bottom text-red" size={20} />
                    <span className="text-red ml-1">{error}</span>
                </div>
            )}
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
                <Form.Item>
                    <WHButton
                        minWidth="100%"
                        type="primary"
                        isSubmit={true}
                        onClick={() => {
                            setIsFetching(true);
                            form.submit();
                        }}
                        fetching={isFetching}
                    >
                        Đăng ký
                    </WHButton>
                </Form.Item>
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
            <div className="register__form--redirect mt-3">
                <h3 className="font-semibold">
                    Bạn đã có tài khoản?
                    <span className="text-primary font-bold">
                        <Link to="/login">Đăng nhập</Link>
                    </span>
                </h3>
            </div>
        </Form>
    );
};

export default RegisterContainer;
