import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { IoSend } from 'react-icons/io5';
import ChatBubble from './ChatBubble';

type ChatBoxProps = {
    name?: string;
    time?: dayjs.Dayjs;
};
function ChatBox({ name, time }: ChatBoxProps) {
    return (
        <div className={`w-full flex flex-col gap-2 items-center justify-between}`}>
            <div className="chatbox__header w-full bg-ws-light-gray border-b-2 p-2">
                <div className="text-sm font-bold text-left">{name ?? 'Giặt sấy Dr.Clean'}</div>
            </div>
            <div className="p-2 w-full">
                <ChatBubble left msg={<>Oke bạn nha</>} />
                <ChatBubble msg={<>Oke bạn nè</>} />
                <ChatBubble left msg={<>Nhớ đánh giá cho mình 5 sao ngen. Mãi iêuuu</>} />
                <ChatBubble msg={<>Oke bạn hí hí</>} />
                <ChatBubble left msg={<>Ô cê con dêeeeeee</>} />
            </div>
            <div className="chatbox__typing left-0 right-0 bottom-0 absolute h-16 border-t-2">
                <TextArea
                    className="w-full p-4 pt-5 pr-8 h-full"
                    placeholder="Nhập nội dung tin nhắn"
                    style={{ resize: 'none' }}
                    bordered={false}
                    rows={1}
                />
                <div className="cursor-pointer absolute right-5 bottom-1/2 translate-y-1/2">
                    <IoSend className="text-xl" />
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
