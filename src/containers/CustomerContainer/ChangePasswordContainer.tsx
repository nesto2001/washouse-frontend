import { Form, Input, Rate, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import WHButton from '../../components/Button';
import { RuleObject } from 'antd/es/form';
import { useState } from 'react';
import { changePassword } from '../../repositories/AuthRepository';

type Props = {};
type ChangePasswordForm = {
    oldPassword: string;
    newPassword: string;
    confirmedPassword: string;
};
const ChangePasswordContainer = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [error, setError] = useState<string>();
    const validatePassword = () => {
        if (form.getFieldValue('newPassword') !== form.getFieldValue('confirmedPassword')) {
            setError('Mật khẩu không trùng khớp');
        } else {
            setError(undefined);
        }
    };
    const onFinish = (values: ChangePasswordForm) => {
        if (values.newPassword !== values.confirmedPassword) {
            setError('Mật khẩu không trùng khớp');
        } else {
            setError(undefined);
            changePassword(values.oldPassword, values.newPassword)
                .then(() => {
                    message.success('Thay đổi mật khẩu thành công');
                    navigate('/user/account/profile');
                })
                .catch(() => setError('Mật khẩu của bạn không chính xác!'));
        }
    };
    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <div className="grid grid-cols-4 items-center gap-y-2">
                <div className="col-span-1 text-right mr-6 mb-6">Mật khẩu hiện tại</div>
                <div className="col-span-2">
                    <Form.Item
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu cũ',
                            },
                        ]}
                    >
                        <Input.Password
                            className={`border border-wh-gray py-2 pl-3 rounded w-full`}
                            type="text"
                            name="user-fn"
                        ></Input.Password>
                    </Form.Item>
                </div>
                <div className="col-span-1 ml-6 mb-6 text-primary">
                    <Link to="/account/reset">Quên mật khẩu?</Link>
                </div>
                <div className="col-span-1 text-right mr-6 mb-6">Mật khẩu mới</div>
                <div className="col-span-2">
                    <Form.Item
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu mới',
                            },
                        ]}
                    >
                        <Input.Password
                            className={`border border-wh-gray py-2 pl-3 rounded w-full`}
                            type="text"
                            name="user-fn"
                            onBlur={validatePassword}
                        ></Input.Password>
                    </Form.Item>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-1 text-right mr-6 mb-6">Xác nhận mật khẩu</div>
                <div className="col-span-2">
                    <Form.Item
                        name="confirmedPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập xác nhận mật khẩu',
                            },
                        ]}
                    >
                        <Input.Password
                            className={`border border-wh-gray py-2 pl-3 rounded w-full`}
                            type="text"
                            name="user-fn"
                            onBlur={validatePassword}
                        ></Input.Password>
                    </Form.Item>
                    {error && <div className="text-ws-red">{error}</div>}
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-1"></div>
                <div className="col-span-3 mt-6">
                    <WHButton
                        type="primary"
                        minWidth="124px"
                        onClick={() => {
                            form.submit();
                        }}
                    >
                        Đổi mật khẩu
                    </WHButton>
                </div>
            </div>
        </Form>
    );
};

export default ChangePasswordContainer;
