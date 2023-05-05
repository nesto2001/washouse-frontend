import { Avatar, Button, Input, InputRef, List, Modal, Switch, message } from 'antd';
import { useCallback, useState, useRef } from 'react';
import '../ManagerContainer.scss';
import Close from '../../../assets/images/close.png';
import { closeMyCenter } from '../../../repositories/StaffRepository';
import { AxiosError } from 'axios';
import { Response } from '../../../models/CommonModel';
import { useNavigate } from 'react-router-dom';
import { getMe, refresh } from '../../../repositories/AuthRepository';

type Props = {};

interface SettingsType {
    thumbnail: string;
    title: string;
    description: string;
}

const settings: SettingsType[] = [
    {
        title: 'Đóng cửa trung tâm',
        description: 'Ngừng hoạt động và đóng cửa vĩnh viễn trung tâm trên Washouse',
        thumbnail: Close,
    },
];

const CenterSecuritySettingsContainer = ({}: Props) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const navigate = useNavigate();
    const inputRef = useRef<InputRef>(null);

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleCloseCenter = () => {
        const confirmText = 'Tôi muốn đóng cửa vĩnh viễn trung tâm của tôi';
        const userInput = inputRef.current?.input;
        console.log(userInput?.value);
        if (confirmText === userInput?.value.trim()) {
            closeMyCenter()
                .then((res) => {
                    if (res) {
                        refresh({
                            refreshToken: localStorage.getItem('refreshToken') ?? '',
                            accessToken: localStorage.getItem('accessToken') ?? '',
                        }).then((res) => {
                            localStorage.setItem('refreshToken', res.data.data.refreshToken);
                            localStorage.setItem('accessToken', res.data.data.accessToken);
                            getMe().then((res) => {
                                localStorage.setItem('currentUser', JSON.stringify(res));
                                message.success('Đóng cửa vĩnh viễn trung tâm thành công');

                                navigate('/provider/role');
                            });
                        });
                    }
                })
                .catch((err: AxiosError<Response<null>>) => {
                    const response = err.response;
                    if (
                        response?.data.message.toLowerCase().includes('order') &&
                        response?.data.message.toLowerCase().includes('processed')
                    ) {
                        message.error('Trung tâm tồn tại đơn hàng đang xử lý, vui lòng hoàn tất xử lý đơn hàng ');
                    } else {
                        message.error('Gặp sự cố trong quá trình đóng cửa trung tâm, vui lòng thử lại sau');
                    }
                });
        } else {
            message.error('Xác nhận đóng cửa chưa đúng!');
        }
    };

    return (
        <>
            <List
                className="settings-list text-base mb-3"
                itemLayout="horizontal"
                dataSource={settings}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button
                                danger
                                onClick={() => {
                                    setOpenModal(true);
                                }}
                                style={{ background: 'white' }}
                            >
                                Đóng cửa
                            </Button>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar size={50} src={item.thumbnail} />}
                            title={<div className="text-base font-medium">{item.title}</div>}
                            description={<div className="text-sm">{item.description}</div>}
                        />
                    </List.Item>
                )}
            />
            <Modal
                title="Đóng cửa trung tâm"
                className="p-6 text-sub text-base"
                maskClosable
                open={openModal}
                closable
                onCancel={() => {
                    setOpenModal(false);
                }}
                destroyOnClose
                footer={false}
            >
                <div className="my-4">
                    Này, Washouse rất tiếc khi nhìn thấy bạn rời đi đấy, bạn có chắc chắn muốn đóng cửa vĩnh viễn trung
                    tâm của mình trên Washouse?
                </div>
                <div>
                    Để xác nhận đóng cửa trung tâm <strong>vĩnh viễn</strong>, vui lòng nhập chính xác{' '}
                    <strong>"Tôi muốn đóng cửa vĩnh viễn trung tâm của tôi"</strong> vào phía dưới.
                </div>
                <Input
                    ref={inputRef}
                    className="my-4 text-ws-red border-2 border-ws-red hover:border-ws-red active:border-ws-red focus:border-ws-red"
                    color="red"
                ></Input>
                <Button
                    className="w-full  bg-ws-red"
                    danger
                    onClick={() => {
                        handleCloseCenter();
                    }}
                >
                    <div className="text-white font-bold">Xác nhận</div>
                </Button>
            </Modal>
        </>
    );
};

export default CenterSecuritySettingsContainer;
