import { message } from 'antd';
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Datepicker from 'tailwind-datepicker-react';
import WHButton from '../../components/Button';
import Input from '../../components/Input/Input';
import Loading from '../../components/Loading/Loading';
import Radio from '../../components/RadioButton';
import { AccountModel } from '../../models/Account/AccountModel';
import { UserModel } from '../../models/User/UserModel';
import { getMe } from '../../repositories/AuthRepository';
import { Option } from '../../types/Options';
import UpdateAvatarContainer from './UpdateAvatarContainer';
import { RcFile } from 'antd/es/upload';
import { uploadSingle } from '../../repositories/MediaRepository';
import { updateCustomerProfile } from '../../repositories/CustomerRepository';

type UpdateRequestData = {
    fullName?: string;
    dob?: Date;
    gender?: number;
};

const UpdateProfileContainer = () => {
    const [userProfile, setUserProfile] = useState<UserModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState<RcFile>();
    const [updateFormData, setUpdateFormData] = useState<UpdateRequestData>();

    const navigate = useNavigate();
    const options = {
        title: '',
        autoHide: false,
        todayBtn: false,
        clearBtn: false,
        maxDate: new Date(),
        minDate: new Date('1950-01-01'),
        theme: {
            background: '',
            todayBtn: '',
            clearBtn: '',
            icons: 'text-sm',
            text: '',
            disabledText: 'text-gray-300',
            input: 'bg-white border-wh-gray rounded',
            inputIcon: '',
            selected: '',
        },
        icons: {
            // () => ReactElement | JSX.Element
            prev: () => (
                <span>
                    <FaAngleLeft />
                </span>
            ),
            next: () => (
                <span>
                    <FaAngleRight />
                </span>
            ),
        },
        datepickerClassNames: 'top-50 pt-1',
        defaultDate: new Date(),
        language: 'vi',
    };

    const [show, setShow] = useState<boolean>(false);
    const handleChange = (selectedDate: Date) => {
        console.log(selectedDate);
    };
    const handleClose = (state: boolean) => {
        setShow(state);
    };

    const handleUpdateProfile = () => {
        image &&
            userProfile &&
            uploadSingle(image).then((res) => {
                updateCustomerProfile(userProfile?.accountId, {
                    dob: new Date().toISOString(),
                    fullName: '',
                    gender: 1,
                    savedFileName: res.data.data.savedFileName,
                });
            });
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
        const user: AccountModel = userJson && JSON.parse(userJson);

        const fetchData = async () => {
            return await getMe();
        };
        fetchData()
            .then((res) => {
                setUserProfile(res);
                setIsLoading(false);
            })
            .catch(() => {
                message.error('Vui lòng đăng nhập để xem trang này');
                navigate('/login');
            });
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
                            <Input type="text" name="user-fullname" value={userProfile?.name}></Input>
                        </div>
                        <div className="col-span-1 text-right mr-6">Số điện thoại</div>
                        <div className="col-span-3 py-2">{userProfile?.phone}</div>
                        <div className="col-span-1 text-right mr-6">Email</div>
                        <div className="col-span-3 py-2">{userProfile && userProfile.email}</div>
                        <div className="col-span-1 text-right mr-6">Ngày sinh</div>
                        <div className="col-span-3 grid grid-cols-5">
                            <div className="col-span-3 max-w-[192px]">
                                <Datepicker
                                    options={options}
                                    onChange={handleChange}
                                    show={show}
                                    setShow={handleClose}
                                />
                            </div>
                            <div className="col-span-2"></div>
                        </div>
                        <div className="col-span-1 text-right mr-6">Giới tính</div>
                        <div className="col-span-3 py-2 flex items-center gap-6">
                            <Radio optionsList={genderOptions} name="gender" inline></Radio>
                        </div>
                        <div className="col-span-1 text-right mr-6"></div>
                        <div className="col-span-3 mt-6">
                            <WHButton type="primary" minWidth="124px">
                                Lưu
                            </WHButton>
                        </div>
                    </div>
                </div>
                <div className="mx-6 bg-wh-gray w-[0.5px]"></div>
                <div className="userprofile__update--avatar pl-10 pr-2">
                    <UpdateAvatarContainer currentImage={userProfile?.avatar} setImage={setImage} />
                </div>
            </div>
        </div>
    );
};

export default UpdateProfileContainer;
