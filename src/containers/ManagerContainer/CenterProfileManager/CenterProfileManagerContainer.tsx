import React from 'react';
import { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import '../ManagerContainer.scss';
import WHButton from '../../../components/Button';

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
                        <WHButton type="primary" link="/provider/registration">
                            Đăng ký trung tâm
                        </WHButton>
                    </div>
                </div>
            )}
        </>
    );
};

export default CenterProfileManagerContainer;
