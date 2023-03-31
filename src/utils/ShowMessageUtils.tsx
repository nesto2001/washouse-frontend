import { message } from "antd";

export const showMessage = (type: string, content: string) => {
    switch (type) {
        case 'success':
            message.success(content);
            break;
        case 'error':
            message.error(content);
            break;
        case 'warning':
            message.warning(content);
            break;
        default:
            message.info(content);
            break;
    }
};
