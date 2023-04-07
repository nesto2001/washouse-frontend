import { Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useState } from 'react';
import WHButton from '../../components/Button';

type Props = {
    currentImage?: string;
    setImage: React.Dispatch<React.SetStateAction<RcFile | undefined>>;
};

const UpdateAvatarContainer = ({ currentImage, setImage }: Props) => {
    const [imageUrl, setImageUrl] = useState<string>();

    const props: UploadProps = {
        name: 'file',
        beforeUpload: (file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageUrl(reader.result as string);
            };
            setImage(file);
            return false;
        },
        accept: 'image/png, image/jpeg',
        maxCount: 1,
        itemRender: () => <></>,
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

            <div className="useravatar--note text-sub-gray text-xs mt-4">
                Dung lượng file tối đa 1 MB Định dạng:.JPEG, .PNG
            </div>
        </div>
    );
};

export default UpdateAvatarContainer;
