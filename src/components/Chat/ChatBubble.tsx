import { Image } from 'antd';
import dayjs from 'dayjs';
import { type } from 'os';

type ChatBubbleProps = {
    left?: boolean;
    msg?: string;
    type: number;
    time?: dayjs.Dayjs;
};
function ChatBubble({ left, msg, time, type }: ChatBubbleProps) {
    return (
        <div className={`w-full flex my-2 items-end gap-1 ${left ? 'justify-start' : 'flex-row-reverse'}`}>
            {type == 0 ? (
                <div
                    className={` ${
                        left ? 'bg-ws-light-gray' : 'bg-primary text-white'
                    } rounded-md w-fit max-w-[200px] py-2 px-4 text-left`}
                >
                    {msg}
                </div>
            ) : (
                <div className="bg-ws-light-gray rounded-lg w-fit max-w-[200px] py-2 px-2 text-left`">
                    <Image src={msg}></Image>
                </div>
            )}
            <div className={`text-sm text-ws-gray`}>{time?.format('DD-MM HH:mm')}</div>
        </div>
    );
}

export default ChatBubble;
