import { Card } from 'antd';
import { useState } from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa';
import ChatBox from '../../components/Chat/ChatBox';
import ChatItem from '../../components/Chat/ChatItem';
import { UserModel } from '../../models/User/UserModel';
import { DocumentSnapshot } from 'firebase/firestore';

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
}

interface ChatPageArguments {
    peerId: string;
    peerAvatar: string;
    peerNickname: string;
}

interface Props {
    item: DocumentSnapshot | null;
}

function ChatboxContainer({ item }: Props) {
    const userJson = localStorage.getItem('currentUser');
    const [user, setUser] = useState<UserModel | null>(userJson ? JSON.parse(userJson) : null);
    const [open, setOpen] = useState<boolean>(false);

    const checkOver24Hours = (timestamp: string) => {
        const now = new Date().getTime();
        const messageTimestamp = new Date(timestamp).getTime();
        const timeDifference = now - messageTimestamp;
        const hoursDifference = timeDifference / (1000 * 3600);
        return hoursDifference > 24;
    };

    const buildMsgListItem = (item: DocumentSnapshot | null) => {
        if (item && user) {
            const data: MessageData = item.data() as MessageData;

            const idTo = data.idFrom === user.accountId.toString() ? data.idTo : data.idFrom;
            const nameTo = data.idFrom === user.accountId.toString() ? data.nameTo : data.nameFrom;
            const avatarTo = data.idFrom === user.accountId.toString() ? data.avatarTo : data.avatarFrom;

            return (
                <div
                    onClick={() => {
                        // navigateToChatDetailPage(idTo, nameTo, avatarTo);
                    }}
                    style={{
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <img
                        src={data.idFrom === user.accountId.toString() ? data.avatarTo : data.avatarFrom}
                        alt="avatar"
                        style={{ borderRadius: '50%', width: '60px', height: '60px' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    width: '250px',
                                }}
                            >
                                {data.idFrom === user.accountId.toString() ? data.nameTo : data.nameFrom}
                            </div>
                            <div style={{ fontSize: '13px', color: '#aaa' }}>
                                {checkOver24Hours(data.lastTimestamp)
                                    ? new Date(data.lastTimestamp).toLocaleTimeString()
                                    : new Date(data.lastTimestamp).toLocaleDateString()}
                            </div>
                        </div>
                        <div
                            style={{
                                fontSize: '15px',
                                color: '#aaa',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                width: '260px',
                            }}
                        >
                            {data.typeContent === 0
                                ? data.lastContent
                                : data.typeContent === 2
                                ? '[Sticker]'
                                : '[Hình ảnh]'}
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <>
            <div className="">{buildMsgListItem(item)}</div>
            {/* <div className={`fixed bottom-6 right-6 transition-all ${open ? 'scale-0' : 'scale-100'}`}>
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
            </div> */}
        </>
    );
}

export default ChatboxContainer;
