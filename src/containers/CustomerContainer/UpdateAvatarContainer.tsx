import { Upload, UploadProps, message } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import React, { useState } from 'react';
import WHButton from '../../components/Button';
import { uploadSingle } from '../../repositories/MediaRepository';
import { updateAccountProfilePic } from '../../repositories/AccountRepository';
import { UpdateAvatarRequest } from '../../models/Customer/UpdateAvatarRequest';

type Props = {
    currentImage?: string;
};

const UpdateAvatarContainer = ({ currentImage }: Props) => {
    const [imageUrl, setImageUrl] = useState<string>();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange = (info: UploadChangeParam) => {
        setFileList([...info.fileList]);
        const file = info.fileList[0]?.originFileObj;
        console.log(file);
        if (file) {
            const uploadFile = async () => {
                return await uploadSingle(file);
            };
            uploadFile().then((res) => {
                setImageUrl(res.data.data.signedUrl);
                const request: UpdateAvatarRequest = {
                    savedFileName: res.data.data.savedFileName,
                };
                updateAccountProfilePic(request)
                    .then((res) => {
                        message.success('Cập nhật ảnh đại diện thành công');
                    })
                    .catch(() => {
                        message.error('Xảy ra lỗi trong quá trình cập nhật, vui lòng thử lại sau');
                    });
            });
        }
    };

    const props: UploadProps = {
        name: 'file',
        beforeUpload: (file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageUrl(reader.result as string);
            };
            return false;
        },
        accept: 'image/*',
        maxCount: 1,
        itemRender: () => <></>,
        onChange: handleChange,
    };

    return (
        <div className="useravatar max-w-[145px] flex flex-col justify-center">
            <div className="useravatar--preview max-h-[145px] max-w-[145px] w-[145px] h-[145px] rounded-full overflow-hidden">
                <img className="h-full object-cover w-full" src={imageUrl || currentImage} alt="" />
            </div>
            <Upload {...props}>
                <div className="useravatar--upload mt-4">
                    <WHButton type="sub" fontSize="14px" style={{ width: '145px' }} minWidth="145px">
                        Chọn ảnh
                    </WHButton>
                </div>
            </Upload>
        </div>
    );
};

export default UpdateAvatarContainer;
