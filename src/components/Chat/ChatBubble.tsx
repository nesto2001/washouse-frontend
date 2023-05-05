import dayjs from 'dayjs';

type ChatBubbleProps = {
    left?: boolean;
    msg?: React.ReactNode;
    time?: dayjs.Dayjs;
};
function ChatBubble({ left, msg, time }: ChatBubbleProps) {
    return (
        <div className={`w-full flex my-2 items-end gap-1 ${left ? 'justify-start' : 'flex-row-reverse'}`}>
            <div className={`bg-ws-light-gray rounded-md w-fit max-w-[200px] py-2 px-4 text-left`}>{msg}</div>
            <div className={`text-sm text-ws-gray`}>{time?.format('DD-MM HH:mm')}</div>
        </div>
    );
}

export default ChatBubble;
