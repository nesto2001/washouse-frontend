import * as React from 'react';
import { useState, useEffect } from 'react';
import Sleep from '../../../assets/images/sleep.png';
import { Avatar, List, Modal, Popconfirm, Switch } from 'antd';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';
import { getManagerCenter } from '../../../repositories/StaffRepository';
import { useNavigate } from 'react-router-dom';
import ErrorScreen from '../../../components/ErrorScreen/ErrorScreen';

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
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();

    useEffect(() => {
        getManagerCenter()
            .then((res) => {
                setMyCenter(res);
            })
            .catch();
    }, []);

    const content = {
        title: '',
        content: (
            <>
                Khách hàng sẽ không thể đặt dịch vụ trong khi trung tâm bạn tạm ngưng hoạt động. Bạn chắc chắn muốn bật
                tạm nghỉ chứ?
            </>
        ),
        okText: 'Tiếp tục',
        cancelText: 'Hủy',
        maskClosable: true,
        
    };

    if (!myCenter) {
        return <ErrorScreen />;
    }

    return (
        <>
            {contextHolder}
            <List
                className="settings-list text-base"
                itemLayout="horizontal"
                dataSource={settings}
                renderItem={(item) => (
                    <List.Item actions={[<Switch checked={myCenter.status.toLowerCase() === 'inactive'} />]}>
                        <List.Item.Meta
                            avatar={<Avatar size={50} src={item.thumbnail} />}
                            title={<div className="text-base font-medium">{item.title}</div>}
                            description={<div className="text-sm">{item.description}</div>}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default CenterSettingsContainer;
