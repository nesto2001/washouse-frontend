import { DatePicker, DatePickerProps, Radio, message } from 'antd';
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import WHButton from '../../components/Button';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import { AccountModel } from '../../models/Account/AccountModel';
import { UserModel } from '../../models/User/UserModel';
import { getMe } from '../../repositories/AuthRepository';
import { Option } from '../../types/Options';
import UpdateAvatarContainer from './UpdateAvatarContainer';
import { RcFile } from 'antd/es/upload';
import { uploadSingle } from '../../repositories/MediaRepository';
import dayjs from 'dayjs';
import Placeholder from '../../assets/images/placeholder.png';
import { getUserProfile, updateAccountProfile } from '../../repositories/AccountRepository';
import { CustomerAccountModel } from '../../models/Account/CustomerAccountModel';

type UpdateRequestData = {
    fullName?: string;
    dob?: string | null;
    gender?: number | null;
    avatar?: string | null;
};

const UpdateProfileContainer = () => {
    const [userProfile, setUserProfile] = useState<CustomerAccountModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [updateFormData, setUpdateFormData] = useState<UpdateRequestData>();

    const navigate = useNavigate();

    const [show, setShow] = useState<boolean>(false);

    const handleChange: DatePickerProps['onChange'] = (date, dateString) => {
        setUpdateFormData((prev) => ({ ...prev, dob: dateString }));
    };

    // const handleChange = (selectedDate: dayjs.Dayjs) => {
    //     setUpdateFormData((prev) => ({ ...prev, dob: selectedDate }));
    // };
    const handleClose = (state: boolean) => {
        setShow(state);
    };

    const handleUpdateProfile = async () => {
        userProfile &&
            updateAccountProfile({
                dob: updateFormData?.dob ?? userProfile.dob ?? undefined,
                fullName: updateFormData?.fullName ?? userProfile.fullname,
                gender: updateFormData?.gender ?? 0,
            })
                .then(() => {
                    message.success('Cập nhật thành công');
                })
                .catch(() => message.error('Có lỗi xảy ra, vui lòng thử lại sau'));
    };
    const genderOptions: Option[] = [
        {
            label: 'Nam',
            value: 0,
        },
        {
            label: 'Nữ',
            value: 1,
        },
        {
            label: 'Khác',
            value: 2,
        },
    ];

    useEffect(() => {
        const userJson = localStorage.getItem('currentUser');
        const user: UserModel = userJson && JSON.parse(userJson);

        const fetchData = async () => {
            return await getUserProfile(user.accountId);
        };
        fetchData()
            .then((res) => {
                setUpdateFormData({
                    dob: res.dob,
                    fullName: res.fullname,
                    gender: res.gender,
                    avatar: res.profilePic,
                });
                setUserProfile(res);
                setIsLoading(false);
            })
            .catch(() => {});
    }, []);

    if (isLoading) {
        const wrap = document.querySelector('.userpage__main');
        return <Loading />;
    }

    return (
        <div className="userprofile w-full border border-wh-gray rounded-2xl mb-10">
            <div className="userprofile--header pt-4 pl-6 font-bold text-xl">Hồ sơ của tôi</div>
            <hr className="mt-3 mb-8" />
            <div className="userprofile--content flex justify-between px-14 mb-16">
                <div className="userprofile__update--form">
                    <div className="grid grid-cols-4 items-center gap-y-2">
                        <div className="col-span-1 text-right mr-6">Họ và tên</div>
                        <div className="col-span-3">
                            <Input
                                type="text"
                                name="user-fullname"
                                value={updateFormData?.fullName}
                                onChange={(e) => {
                                    setUpdateFormData((prev) => ({ ...prev, fullName: e.target.value }));
                                }}
                            ></Input>
                        </div>
                        <div className="col-span-1 text-right mr-6">Số điện thoại</div>
                        <div className="col-span-3 py-2">{userProfile?.phone}</div>
                        <div className="col-span-1 text-right mr-6">Email</div>
                        <div className="col-span-3 py-2">{userProfile && userProfile.email}</div>
                        <div className="col-span-1 text-right mr-6">Ngày sinh</div>
                        <div className="col-span-3 grid grid-cols-5">
                            <div className="col-span-3 max-w-[192px]">
                                <DatePicker
                                    className="border border-wh-gray py-2 pl-3 undefined rounded"
                                    format={'DD-MM-YYYY'}
                                    onChange={handleChange}
                                    defaultValue={
                                        dayjs(userProfile?.dob, 'DD-MM-YYYY') ??
                                        dayjs(dayjs(), 'DD-MM-YYYY').subtract(15, 'year')
                                    }
                                    disabledDate={(date: dayjs.Dayjs) => {
                                        return date && date > dayjs().subtract(15, 'year');
                                    }}
                                    showToday={false}
                                />
                            </div>
                            <div className="col-span-2"></div>
                        </div>
                        <div className="col-span-1 text-right mr-6">Giới tính</div>
                        <div className="col-span-3 py-2 flex items-center gap-6">
                            <Radio.Group
                                options={genderOptions}
                                name="gender"
                                defaultValue={userProfile?.gender}
                                onChange={(e) => {
                                    setUpdateFormData((prev) => ({ ...prev, gender: e.target.value }));
                                }}
                            ></Radio.Group>
                        </div>
                        <div className="col-span-1 text-right mr-6"></div>
                        <div className="col-span-3 mt-6">
                            <WHButton type="primary" minWidth="124px" onClick={handleUpdateProfile}>
                                Lưu
                            </WHButton>
                        </div>
                    </div>
                </div>
                <div className="mx-6 bg-wh-gray w-[0.5px]"></div>
                <div className="userprofile__update--avatar pl-10 pr-2">
                    <UpdateAvatarContainer currentImage={userProfile?.profilePic ?? Placeholder} />
                </div>
            </div>
        </div>
    );
};

export default UpdateProfileContainer;
