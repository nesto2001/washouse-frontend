import { Button, Input } from 'antd';
import { useCallback, useState } from 'react';
import '../ManagerContainer.scss';

type Props = {};

const CenterSecuritySettingContainer = ({}: Props) => {
    const [hasDelivery, sethasDelivery] = useState<boolean>(false);
    const [, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    const handleSwitchChange = (checked: boolean) => {
        sethasDelivery(checked);
    };
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="p-6 text-sub text-base">
            <div className="my-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div>
                Để xác nhận xóa trung tâm <strong>vĩnh viễn</strong>, vui lòng nhập chính xác{' '}
                <strong>"Tôi muốn xóa vĩnh viễn trung tâm của tôi"</strong> vào phía dưới.
            </div>
            <Input
                className="my-4 text-ws-red border-2 border-ws-red hover:border-ws-red active:border-ws-red focus:border-ws-red"
                color="red"
            ></Input>
            <Button className="w-full  bg-ws-red" danger>
                <div className="text-white font-bold">Xác nhận</div>
            </Button>
        </div>
    );
};

export default CenterSecuritySettingContainer;
