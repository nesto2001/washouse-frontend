import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { FaAngleDown } from 'react-icons/fa';

type Props = {
    items: MenuProps['items'];
    menuText: string;
    className?: string;
};

const DropdownMenu = ({ items, menuText, className }: Props) => {
    return (
        <div className="z-[9999]">
            <Dropdown menu={{ items }} className={className}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {menuText}
                        <FaAngleDown />
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
};

export default DropdownMenu;
