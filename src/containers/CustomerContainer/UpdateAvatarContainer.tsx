import React from 'react';
import Placeholder from '../../assets/images/placeholder.png';
import WHButton from '../../components/Button';

type Props = {};

const UpdateAvatarContainer = (props: Props) => {
    return (
        <div className="useravatar max-w-[145px]">
            <div className="useravatar--preview max-h-[145px] max-w-[145px] w-[145px] h-[145px] rounded-full overflow-hidden">
                <img className="h-full object-cover" src={Placeholder} alt="" />
            </div>
            <div className="useravatar--upload mt-4">
                <WHButton type="sub" fontSize="14px">
                    Chọn ảnh
                </WHButton>
            </div>
            <div className="useravatar--note text-sub-gray text-xs mt-4">
                Dung lượng file tối đa 1 MB Định dạng:.JPEG, .PNG
            </div>
        </div>
    );
};

export default UpdateAvatarContainer;
