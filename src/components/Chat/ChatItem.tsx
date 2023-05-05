import dayjs from 'dayjs';
import UserPlaceholder from '../../assets/images/user-placeholder.png';
import { Badge } from 'antd';

type ChatItemProps = {
    avatar?: string;
    name?: string;
    active?: boolean;
    lastMsg?: string;
    numOfUnread?: number;
    onClick?: () => void;
    time?: dayjs.Dayjs;
};
function ChatItem({ onClick, avatar, name, lastMsg, time, active, numOfUnread }: ChatItemProps) {
    return (
        <div
            className={`w-full flex px-2 py-3 gap-2 items-center justify-between border-b-2 hover:bg-ws-light-gray cursor-pointer ${
                active ? 'bg-ws-light-gray' : ''
            }`}
            onClick={onClick}
        >
            <div>
                <img src={avatar ?? UserPlaceholder} alt="" className="h-10 w-10 rounded-full" />
            </div>
            <div className="flex flex-col items-start justify-between h-full">
                <div className="text-sm font-bold">{name}</div>
                <div className="text-sm">{lastMsg}</div>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
                <div className="text-sm">{time?.format('DD/MM')}</div>
                <Badge count={numOfUnread ?? 1} size="small" />
            </div>
        </div>
    );
}

export default ChatItem;
