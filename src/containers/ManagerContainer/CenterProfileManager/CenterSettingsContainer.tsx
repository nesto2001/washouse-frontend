import { Avatar, ButtonProps, List, Modal, Switch, Tabs, TabsProps, message } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sleep from '../../../assets/images/sleep.png';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';
import OthersSpin from '../../../components/OthersSpin/OthersSpin';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';
import { activateMyCenter, deactivateMyCenter, getManagerCenter } from '../../../repositories/StaffRepository';
import CenterDeliverySettingsContainer from './CenterDeliverySettingsContainer';
import CenterSecuritySettingsContainer from './CenterSecuritySettingsContainer';
import CenterOperatingSettingsContainer from './CenterOperatingSettingsContainer';

type Props = {};

interface SettingsType {
    thumbnail: string;
    title: string;
    description: string;
}

const settings: SettingsType[] = [
    {
        title: 'Chế độ Tạm nghỉ',
        description:
            'Kích hoạt Chế độ Tạm nghỉ để ngăn khách hàng đặt đơn hàng mới. Những đơn hàng đang tiến hành vẫn phải được xử lý.',
        thumbnail: Sleep,
    },
];

const CenterSettingsContainer = (props: Props) => {
    const [myCenter, setMyCenter] = useState<ManagerCenterModel>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [popupLoading, setPopupLoading] = useState<boolean>(false);
    const [switchOn, setSwitchOn] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState(1);
    const navigate = useNavigate();
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const [modal, contextHolder] = Modal.useModal();

    useEffect(() => {
        setIsLoading(true);
        getManagerCenter()
            .then((res) => {
                setMyCenter(res);
                setIsLoading(false);
                setSwitchOn(
                    res.status.toLowerCase() === 'inactive'
                        ? true
                        : res.status.toLowerCase() === 'active'
                        ? false
                        : false,
                );
            })
            .catch();
    }, []);

    const handleDeactivate = () => {
        setPopupLoading(true);
        if (myCenter && (myCenter.status.toLowerCase() === 'active' || myCenter.status.toLowerCase() === 'updating')) {
            deactivateMyCenter()
                .then(() => {
                    message.success('Bật chế độ tạm nghỉ thành công');
                    setPopupLoading(false);
                    forceUpdate();
                })
                .catch((err) => {
                    message.error('Xảy ra lỗi trong quá trình thiết lập, vui lòng thử lại sau');
                    setSwitchOn(false);
                });
        } else {
            switch (myCenter && myCenter.status.toLowerCase()) {
                case 'pending':
                    message.error('Không thể cập nhật thiết lập do trung tâm chưa được cấp phép hoạt động');
                    break;
                case 'suspended':
                    message.error('Không thể cập nhật thiết lập do trung tâm đang ở trạng thái đình chỉ hoạt động');
                    break;
                case 'closed':
                    message.error('Không thể cập nhật thiết lập do trung tâm đã đóng cửa vĩnh viễn');
                    break;
                case 'rejected':
                    message.error('Không thể cập nhật thiết lập do trung tâm chưa được cấp phép hoạt động');
                    break;
            }
        }
    };

    const handleActivate = () => {
        setPopupLoading(true);
        if (myCenter && myCenter.status.toLowerCase() === 'inactive') {
            activateMyCenter()
                .then(() => {
                    message.success('Tắt chế độ tạm nghỉ thành công');
                    setPopupLoading(false);
                    forceUpdate();
                })
                .catch((err) => {
                    message.error('Xảy ra lỗi trong quá trình thiết lập, vui lòng thử lại sau');
                    setSwitchOn(true);
                });
        } else {
            switch (myCenter && myCenter.status.toLowerCase()) {
                case 'pending':
                    message.error('Không thể cập nhật thiết lập do trung tâm chưa được cấp phép hoạt động');
                    break;
                case 'suspended':
                    message.error('Không thể cập nhật thiết lập do trung tâm đang ở trạng thái đình chỉ hoạt động');
                    break;
                case 'closed':
                    message.error('Không thể cập nhật thiết lập do trung tâm đã đóng cửa vĩnh viễn');
                    break;
                case 'rejected':
                    message.error('Không thể cập nhật thiết lập do trung tâm chưa được cấp phép hoạt động');
                    break;
                case 'active':
                    message.error('Không thể cập nhật thiết lập do trung tâm đã đang không trong chế độ tạm nghỉ');
                    break;
                case 'updating':
                    message.error('Không thể cập nhật thiết lập do trung tâm đã đang không trong chế độ tạm nghỉ');
                    break;
            }
        }
    };

    const handleCancel = () => {
        setSwitchOn(switchOn);
    };

    const handleSwitchToggle = () => {
        setSwitchOn(!switchOn);
        modal.confirm({
            title: switchOn ? 'Tắt chế độ tạm nghỉ' : 'Bật chế độ tạm nghỉ',
            content: switchOn ? (
                <>
                    Khi được tắt, Chế độ tạm nghỉ sẽ chỉ có thể được kích hoạt lại sau 3 giờ. Bạn có thật sự muốn tắt
                    Chế độ tạm nghỉ?
                </>
            ) : (
                <>
                    Khách hàng sẽ không thể đặt dịch vụ trong khi trung tâm bạn tạm ngưng hoạt động. Bạn chắc chắn muốn
                    bật tạm nghỉ chứ?
                </>
            ),
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            cancelButtonProps: { style: { background: 'white' } } as ButtonProps,
            okButtonProps: { loading: popupLoading } as ButtonProps,
            maskClosable: true,
            onOk: switchOn ? handleActivate : handleDeactivate,
            onCancel: handleCancel,
        });
    };

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
        .ant-tabs-nav-list {
            display: flex;
            align-items: center;
            justify-content: start !important;
            width: 100%;
        }
        .ant-tabs-tab {
            width: 50%;
            justify-content: center;
        }
        ant-tabs-nav{
            display: flex;
        }    
        .ant-tabs .ant-tabs-tab {
            flex-grow: 0;
            margin-right: 0px;
            margin-left: 0px !important;
            padding: 12px 20px;
            width: unset;
            text-align: center;
            
        }
        .ant-tabs .ant-tabs-tab:first-of-type {
            margin-left: 24px !important;
        }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    if (isLoading) {
        return <OthersSpin />;
    }

    if (!myCenter) {
        return <ErrorScreen />;
    }

    const onChange = (key: string) => {
        setActiveTab(parseInt(key));
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Thiết lập cơ bản`,
        },
        {
            key: '2',
            label: `Thiết lập hoạt động`,
        },
        {
            key: '3',
            label: `Thiết lập vận chuyển`,
        },
        // {
        //     key: '3',
        //     label: `Thiết lập thanh toán`,
        // },
        {
            key: '4',
            label: `Thiết lập bảo mật`,
        },
    ];

    return (
        <>
            {contextHolder}
            <Tabs items={items} onChange={onChange} />
            {activeTab === 1 && (
                <List
                    className="settings-list text-base mb-3"
                    itemLayout="horizontal"
                    dataSource={settings}
                    renderItem={(item) => (
                        <List.Item actions={[<Switch checked={switchOn} onChange={handleSwitchToggle} />]}>
                            <List.Item.Meta
                                avatar={<Avatar size={50} src={item.thumbnail} />}
                                title={<div className="text-base font-medium">{item.title}</div>}
                                description={<div className="text-sm">{item.description}</div>}
                            />
                        </List.Item>
                    )}
                />
            )}
            {activeTab === 2 && <CenterOperatingSettingsContainer />}
            {activeTab === 3 && <CenterDeliverySettingsContainer />}
            {activeTab === 4 && <CenterSecuritySettingsContainer />}
        </>
    );
};

export default CenterSettingsContainer;
