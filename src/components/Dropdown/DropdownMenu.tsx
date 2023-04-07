import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { FaAngleDown } from 'react-icons/fa';

type Props = {
    items: MenuProps['items'];
    content: React.ReactNode;
    className?: string;
};

const DropdownMenu = ({ items, content, className }: Props) => {
    return (
        <div className="z-[9999] h-full">
            <Dropdown menu={{ items }} className={className}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {content}
                        <FaAngleDown />
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
};

export default DropdownMenu;
