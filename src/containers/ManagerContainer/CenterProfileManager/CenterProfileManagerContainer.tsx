import React from 'react';
import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import '../ManagerContainer.scss';
import Button from '../../../components/Button';

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Thông tin cơ bản`,
        children: <div className="px-6">Content of Tab Pane 1</div>,
    },
    {
        key: '2',
        label: `Địa chỉ & liên hệ`,
        children: <div className="px-6">Content of Tab Pane 2</div>,
    },
];

type Props = {};

const CenterProfileManagerContainer = (props: Props) => {
    const [center, setCenter] = useState(false);

    return (
        <>
            {center ? (
                <>
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Hồ sơ trung tâm</div>
                    <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                        Kiểm tra tình trạng trung tâm và cập nhật hồ sơ trung tâm của bạn
                    </div>
                    <Tabs className="mt-3" defaultActiveKey="1" items={items} onChange={onChange} />
                </>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    Bạn chưa đăng ký bất kỳ trung tâm nào
                    <div className="provider__page--action center__action--register">
                        <Button type="primary" link="/provider/registration">
                            Đăng ký trung tâm
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CenterProfileManagerContainer;
