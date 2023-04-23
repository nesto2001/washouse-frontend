import { Form } from 'antd';
import { RuleObject } from 'antd/es/form';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Google from '../../assets/images/google.png';
import WHButton from '../../components/Button';
import Input from '../../components/Input/Input';
import { RegisterRequest } from '../../models/Account/RegisterRequest';
import { getMe, login, loginStaff, registerCustomer, registerProvider } from '../../repositories/AuthRepository';
import { RegisterErrors } from '../../types/RegisterErrors';

type Props = {};

const StaffRegisterContainer = () => {
    const [form] = Form.useForm();
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState<RegisterRequest>({
        phone: '',
        email: '',
        password: '',
        confirmPass: '',
    });

    const onFinish = (values: any) => {
        const isAllFieldsFilled = Object.values(registerData).every((value) => value);
        if (isAllFieldsFilled) {
            const registerPro = async () => {
                return await registerProvider(registerData);
            };
            registerPro().then((res) => {
                if (res.status == 200) {
                    const loginProvider = async () => {
                        return await loginStaff({ phone: registerData.phone, password: registerData.password });
                    };
                    loginProvider().then((res) => {
                        console.log(res);
                        if (res.status == 200) {
                            localStorage.setItem('accessToken', res.data.data.accessToken);
                            localStorage.setItem('refreshToken', res.data.data.refreshToken);
                            const fetchData = async () => {
                                return await getMe();
                            };
                            fetchData().then((res) => {
                                localStorage.setItem('currentUser', JSON.stringify(res));
                                navigate('/provider/dashboard');
                            });
                        } else {
                            console.log('lỗi login'); //Message
                        }
                    });
                }
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const validatePassword = async (_: RuleObject, value: string) => {
        const formValue = form.getFieldsValue();
        if (value && value !== formValue.user_password) {
            throw new Error('Mật khẩu không trùng khớp');
        }
    };

    return (
        <Form form={form} name="register" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
            <div className="register__form--tspp text-xs mt-3">
                Bằng việc đăng ký, bạn đã đồng ý với Washouse về{' '}
                <Link to="/terms" className="text-primary">
                    Điều khoản, điều kiện sử dụng dịch vụ
                </Link>
            </div>
            <div className="register__form--action mt-3">
                <Form.Item noStyle>
                    <WHButton
                        minWidth="100%"
                        type="primary"
                        isSubmit={true}
                        onClick={() => {
                            form.submit();
                        }}
                    >
                        Đăng ký
                    </WHButton>
                </Form.Item>
            </div>
            <div className="register__form--redirect mt-3">
                <h3 className="font-semibold">
                    Bạn đã có tài khoản?{' '}
                    <span className="text-primary font-bold">
                        <Link to="/provider/login">Đăng nhập</Link>
                    </span>{' '}
                </h3>
            </div>
        </Form>
    );
};

export default StaffRegisterContainer;
