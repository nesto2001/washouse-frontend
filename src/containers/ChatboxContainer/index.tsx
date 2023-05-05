import { Card } from 'antd';
import { useState } from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa';
import ChatBox from '../../components/Chat/ChatBox';
import ChatItem from '../../components/Chat/ChatItem';
import { UserModel } from '../../models/User/UserModel';

interface MessageData {
    idFrom: string;
    idTo: string;
    nameFrom: string;
    nameTo: string;
    avatarFrom: string;
    avatarTo: string;
    lastContent: string;
    typeContent: number;
    lastTimestamp: string;
    document: string;
}
export interface MessageDetailData {
    idFrom: string;
    idTo: string;
    nameFrom: string;
    nameTo: string;
    avatarFrom: string;
    avatarTo: string;
    lastContent: string;
    typeContent: number;
    lastTimestamp: string;
    document: string;
}
interface Props {
    user: UserModel;
}

function ChatboxContainer({ user }: Props) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <div className={`fixed bottom-6 right-6 transition-all ${open ? 'scale-0' : 'scale-100'}`}>
                <div
                    className="bg-primary p-5 rounded-full shadow-black drop-shadow-lg cursor-pointer hover:bg-ws-hover-blue transition-all"
                    onClick={() => setOpen(true)}
                >
                    <BsFillChatDotsFill className="text-white text-3xl" />
                </div>
            </div>
            <div
                className={`fixed bottom-6 right-6 h-[580px] w-[680px] transition-all ${
                    !open ? 'scale-0 translate-x-1/2 translate-y-1/2' : 'scale-100'
                }`}
            >
                <Card
                    title={
                        <div className="flex justify-between items-center">
                            <div className="text-white text-left text-lg">Chat với trung tâm</div>
                            <FaAngleDown className="text-white cursor-pointer text-lg" onClick={() => setOpen(false)} />
                        </div>
                    }
                    headStyle={{ backgroundColor: 'var(--washouse-primary-blue)' }}
                    className="shadow-black drop-shadow-lg p-0"
                    bodyStyle={{ padding: 0, height: '524px' }}
                >
                    <div className="flex w-full h-full">
                        <div className="message_list basis-4/12 border-r-2 h-full flex flex-col">
                            <ChatItem active />
                            <ChatItem />
                            <ChatItem />
                            <ChatItem />
                        </div>
                        <div className="message_content basis-8/12 h-full relative">
                            <ChatBox />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default ChatboxContainer;
