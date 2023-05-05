import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { FieldValue } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { IoSend } from 'react-icons/io5';
import { MessageDetailData } from '../../containers/ChatboxContainer';
import { UserModel } from '../../models/User/UserModel';
import ChatBubble from './ChatBubble';

type ChatBoxProps = {
    user: UserModel;
    name?: string;
    time?: dayjs.Dayjs;
    messages: MessageDetailData[];
    onSend: (message: MessageDetailData) => void;
};

function ChatBox({ name, time, messages, onSend, user }: ChatBoxProps) {
    const boxRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<string>();
    const handleSend = () => {
        if (content) {
            onSend({
                content: content,
                type: 0,
                timestamp: dayjs(),
                document: '',
                idFrom: '',
            });
            setContent(undefined);
        }
    };
    useEffect(() => {
        boxRef.current?.scrollTo(0, boxRef.current.scrollHeight);
    }, [messages]);

    return (
        <div className={`w-full flex flex-col gap-2 items-center justify-between}`}>
            {name && (
                <div className="chatbox__header w-full bg-ws-light-gray border-b-2 p-2">
                    <div className="text-sm font-bold text-left">{name}</div>
                </div>
            )}
            <div className="p-2 w-full overflow-y-scroll scroll-smooth h-96" ref={boxRef}>
                {messages.map((ms) => (
                    <ChatBubble
                        time={ms.timestamp}
                        left={ms.idFrom != user.accountId.toString()}
                        msg={ms.content}
                        type={ms.type}
                    />
                ))}
            </div>
            <div className="chatbox__typing left-0 right-0 bottom-0 absolute h-16 border-t-2">
                <TextArea
                    className="w-full p-4 pt-5 pr-8 h-full"
                    placeholder="Nhập nội dung tin nhắn"
                    style={{ resize: 'none' }}
                    bordered={false}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={1}
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <div className="cursor-pointer absolute right-5 bottom-1/2 translate-y-1/2">
                    <IoSend className="text-xl" onClick={handleSend} />
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
