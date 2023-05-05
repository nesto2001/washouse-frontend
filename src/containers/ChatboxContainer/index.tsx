import { collection, doc, getDocs, onSnapshot, query, setDoc, where } from '@firebase/firestore';
import { Card } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FaAngleDown } from 'react-icons/fa';
import ChatBox from '../../components/Chat/ChatBox';
import ChatItem from '../../components/Chat/ChatItem';
import { UserModel } from '../../models/User/UserModel';
import { generateRandomString, getURLId } from '../../utils/CommonUtils';
import { db } from '../../utils/firebase';
import { useLocation } from 'react-router';
import { getCenter, getCenterBrief } from '../../repositories/CenterRepository';
import { CenterModel } from '../../models/Center/CenterModel';

interface MessageData {
    idFrom: string;
    idTo: string;
    nameFrom: string;
    nameTo: string;
    avatarFrom: string;
    avatarTo: string;
    lastContent: string;
    typeContent: number;
    lastTimestamp: dayjs.Dayjs;
    document: string;
}
export interface MessageDetailData {
    content: string;
    idFrom: string;
    timestamp: dayjs.Dayjs;
    type: number;
    document: string;
}
interface Props {
    manager?: boolean;
    user: UserModel;
}

function ChatboxContainer({ user, manager }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<MessageData[]>([]);
    const [messageDetails, setMessageDetails] = useState<MessageDetailData[]>([]);
    const [currentBox, setCurrentBox] = useState<MessageData>();
    const [center, setCenter] = useState<CenterModel>();
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);
    const location = useLocation();

    const centerId = getURLId(location.pathname);

    useEffect(() => {
        const messageRef = collection(db, 'messages');

        const q =
            manager && user.centerId
                ? query(messageRef, where('idTo', '==', user.centerId.toString()))
                : query(messageRef, where('idFrom', '==', user.accountId.toString()));
        const unsub = onSnapshot(q, { includeMetadataChanges: true }, (doc) => {
            forceUpdate();
        });
        forceUpdate();
        return () => unsub();
    }, []);

    useEffect(() => {
        if (location.pathname.includes('/trung-tam/')) {
            getCenterBrief(+centerId).then((res) => {
                setCurrentBox(
                    messages.filter((ms) => ms.document == `${user.accountId}-${res.id}`)?.at(0) ?? {
                        avatarFrom: user.avatar,
                        avatarTo: res.thumbnail,
                        idFrom: user.accountId?.toString(),
                        idTo: res.id.toString(),
                        lastContent: '',
                        lastTimestamp: dayjs(),
                        nameFrom: user.name,
                        nameTo: res.title,
                        typeContent: 0,
                        document: `${user.accountId}-${res.id}`,
                    },
                );
                setCenter(res);
            });
        }
    }, [location.pathname]);

    useEffect(() => {
        getData();
    }, [state]);

    const getData = async () => {
        const messageRef = collection(db, 'messages');

        const q =
            manager && user.centerId
                ? query(messageRef, where('idTo', '==', user.centerId.toString()))
                : query(messageRef, where('idFrom', '==', user.accountId.toString()));

        const querySnapshot = await getDocs(q);

        const chatList: MessageData[] = [];

        querySnapshot.forEach((doc) => {
            chatList.push({
                document: doc.id,
                avatarFrom: doc.data().avatarFrom,
                avatarTo: doc.data().avatarTo,
                idFrom: doc.data().idFrom,
                idTo: doc.data().idTo,
                lastContent: doc.data().lastContent,
                lastTimestamp: dayjs(doc.data().lastTimestamp, 'YYYY-MM-DD HH:mm:ss'),
                nameFrom: doc.data().nameFrom,
                nameTo: doc.data().nameTo,
                typeContent: doc.data().typeContent,
            });
        });

        setCurrentBox(chatList[0]);
        setMessages(chatList);
    };

    useEffect(() => {
        getDataDetail();
    }, [currentBox, state]);

    const getDataDetail = async () => {
        if (!currentBox?.document) {
            return;
        }
        const messageRef = collection(db, 'messages');

        const querySnapshot = await getDocs(collection(messageRef, currentBox?.document, 'msglist'));

        const details: MessageDetailData[] = [];
        querySnapshot.forEach((doc) => {
            details.push({
                document: doc.id,
                content: doc.data().content,
                idFrom: doc.data().idFrom,
                timestamp: dayjs(+doc.data().timestamp),
                type: doc.data().type,
            });
        });

        setMessageDetails(details);
    };

    const handleSend = async (message: MessageDetailData) => {
        if (!currentBox?.document) {
            return;
        }
        const messageRef = collection(db, 'messages');

        await setDoc(doc(messageRef, currentBox.document), {
            idFrom: currentBox.idFrom,
            idTo: currentBox.idTo,
            nameFrom: currentBox.nameFrom,
            nameTo: currentBox.nameTo,
            avatarFrom: currentBox.avatarFrom,
            avatarTo: currentBox.avatarTo,
            lastContent: message.content,
            typeContent: message.type,
            lastTimestamp: message.timestamp.format('YYYY-MM-DD HH:mm:ss'),
        });

        await setDoc(doc(collection(messageRef, currentBox?.document, 'msglist'), generateRandomString(12)), {
            content: message.content,
            idFrom: user.accountId.toString(),
            timestamp: (dayjs().unix() * 1000).toString(),
            type: message.type,
        });
    };
    return (
        <>
            <div className={`fixed bottom-6 z-50 right-6 transition-all ${open ? 'scale-0' : 'scale-100'}`}>
                <div
                    className="bg-primary p-5 rounded-full shadow-black drop-shadow-lg cursor-pointer hover:bg-ws-hover-blue transition-all"
                    onClick={() => setOpen(true)}
                >
                    <BsFillChatDotsFill className="text-white text-3xl" />
                </div>
            </div>
            <div
                className={`fixed bottom-6 right-6 h-[580px] w-[680px] z-50 transition-all ${
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
                            {center &&
                            currentBox &&
                            !messages.filter((ms) => ms.document == `${user.accountId}-${center.id}`)?.at(0)
                                ? [currentBox]
                                      .concat(messages)
                                      ?.sort((a, b) => (b.lastTimestamp.isAfter(a.lastTimestamp) ? 1 : -1))
                                      ?.map((message) => (
                                          <ChatItem
                                              active={message.document == currentBox?.document}
                                              avatar={
                                                  message.idFrom == user.accountId.toString()
                                                      ? message.avatarTo
                                                      : message.avatarFrom
                                              }
                                              name={
                                                  message.idFrom == user.accountId.toString()
                                                      ? message.nameTo.substring(0, 15)
                                                      : message.nameFrom.substring(0, 15)
                                              }
                                              lastMsg={
                                                  message.typeContent == 0
                                                      ? message.lastContent.substring(0, 20)
                                                      : 'Hình ảnh'
                                              }
                                              time={message.lastTimestamp}
                                              onClick={() => setCurrentBox(message)}
                                          />
                                      ))
                                : messages
                                      .sort((a, b) => (b.lastTimestamp.isAfter(a.lastTimestamp) ? 1 : -1))
                                      ?.map((message) => (
                                          <ChatItem
                                              active={message.document == currentBox?.document}
                                              avatar={
                                                  message.idFrom == user.accountId.toString()
                                                      ? message.avatarTo
                                                      : message.avatarFrom
                                              }
                                              name={
                                                  message.idFrom == user.accountId.toString()
                                                      ? message.nameTo.substring(0, 15)
                                                      : message.nameFrom.substring(0, 15)
                                              }
                                              lastMsg={
                                                  message.typeContent == 0
                                                      ? message.lastContent.substring(0, 20)
                                                      : 'Hình ảnh'
                                              }
                                              time={message.lastTimestamp}
                                              onClick={() => setCurrentBox(message)}
                                          />
                                      ))}
                        </div>
                        <div className="message_content basis-8/12 h-full relative">
                            <ChatBox
                                user={user}
                                name={currentBox?.nameTo}
                                messages={messageDetails.sort((a, b) => (b.timestamp.isAfter(a.timestamp) ? -1 : 1))}
                                onSend={handleSend}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default ChatboxContainer;
