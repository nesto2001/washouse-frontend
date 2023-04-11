import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { QuestionCircleOutlined, DownOutlined } from '@ant-design/icons';
import WHButton from '../../components/Button';
import Loading from '../../components/Loading/Loading';
import Map from '../../components/Map/Map';
import { AccountModel } from '../../models/Account/AccountModel';
import { UserModel } from '../../models/User/UserModel';
import { getUserProfile, updateAccountAddress } from '../../repositories/AccountRepository';
import EmptyAddress from '../../assets/images/empty-address.png';
import { Form, Modal, Tooltip, message } from 'antd';
import { LocationPlaceModel } from '../../models/LocationPlaceModel';
import { getDistricts, getLocation, getWards, searchLocation } from '../../repositories/LocationRepository';
import Selectbox from '../../components/Selectbox';
import Input from '../../components/Input/Input';
import { Option } from '../../types/Options';
import { LocationDetailsModel } from '../../models/Location/LocationDetailsModel';
type Props = {};

type UpdateAddressForm = {
    address?: string;
    districtId?: number;
    wardId?: number;
};

const UpdateAddressContainer = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<AccountModel>();
    const [userAddress, setUserAddress] = useState<LocationDetailsModel>();
    const [form] = Form.useForm();
    const [district, setDistrict] = useState<number>();
    const [districtList, setDistrictList] = useState<LocationPlaceModel[]>([]);
    const [wardList, setWardList] = useState<LocationPlaceModel[]>([]);
    const [updateFormData, setUpdateFormData] = useState<UpdateAddressForm>();

    const userJson = localStorage.getItem('currentUser');
    const user: UserModel = userJson && JSON.parse(userJson);

    const location = useLocation();

    const mapStyles: React.CSSProperties = {
        height: '100%',
        width: '100%',
    };

    const iconSize: L.PointExpression = [30, 30];
    const iconAnchor: L.PointExpression = [15, 15];

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                return await getUserProfile(user.accountId);
            };
            fetchData().then((res) => {
                setUserProfile(res);
                if (res.locationId) {
                    const fetchLocation = async () => {
                        return await getLocation(res.locationId ?? 0);
                    };
                    fetchLocation().then((res) => {
                        if (res) {
                            setUserAddress(res);
                            setIsLoading(false);
                        }
                    });
                }
                setIsLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            return await getDistricts();
        };
        fetchData().then((res) => {
            setDistrictList(res);
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            return await getWards(district ?? userAddress?.ward.district.id ?? 0);
        };
        fetchData().then((res) => {
            setWardList(res);
        });
    }, [district]);

    const handleOpenModal = () => {
        setModalVisibility(true);
    };

    const handleUpdateAddress = () => {
        form.submit();
    };

    const handleModalCancel = () => {
        setModalVisibility(false);
    };

    if (isLoading && !userAddress) {
        return <Loading />;
    }

    const handleSelectDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUpdateFormData((prev) => ({ ...prev, districtId: parseInt(event.target.value) }));
        setDistrict(parseInt(event.target.value));
        const fetchData = async () => {
            return await getWards(parseInt(event.target.value));
        };
        fetchData().then((res) => {
            setWardList(res);
        });
    };

    const handleSelectWardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUpdateFormData((prev) => ({ ...prev, wardId: parseInt(event.target.value) }));
    };

    const handleSelectCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {};

    const onFinish = (values: any) => {
        const getLocation = async () => {
            return await searchLocation(values.address, values.ward);
        };
        getLocation().then((res) => {
            updateAccountAddress({
                addressString: values.address,
                wardId: values.ward,
                latitude: res.latitude,
                longitude: res.longitude,
            }).then((res) => {
                message.success('Cập nhật địa chỉ thành công');
                setModalVisibility(false);
            });
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="useraddress w-full border border-wh-gray rounded-2xl mb-10">
            <div className="useraddress--header pt-4 pl-6 font-bold text-xl">Địa chỉ của tôi</div>
            <hr className="mt-3 mb-8" />
            {userProfile && userAddress ? (
                <div className="useraddress--content flex justify-between pl-14 pr-6 mb-16">
                    <div className="useraddress--details">
                        <div className="useraddress--user flex justify-start items-center">
                            <div className="font-medium">{userProfile.fullName}</div>
                            <div className="mx-3 border bg-wh-gray w-[0.5px] h-6"></div>
                            <div className="text-sm text-sub-gray">{userProfile.phone}</div>
                        </div>
                        <div className="useraddress--address grid grid-cols-3 mt-5 gap-y-6">
                            <div className="col-span-1 min-w-[150px] flex flex-col">
                                <div className="font-medium text-sub-gray">Tỉnh / thành phố</div>
                                <div className="mt-3">TP. Hồ Chí Minh</div>
                            </div>
                            <div className="col-span-1 min-w-[150px] flex flex-col">
                                <div className="font-medium text-sub-gray">Quận / huyện</div>
                                <div className="mt-3">{userAddress.ward.district.name}</div>
                            </div>
                            <div className="col-span-1 min-w-[150px] flex flex-col">
                                <div className="font-medium text-sub-gray">Phường / xã</div>
                                <div className="mt-3">{userAddress.ward.name}</div>
                            </div>
                            <div className="col-span-3 min-w-[140px] flex flex-col">
                                <div className="font-medium text-sub-gray">Địa chỉ cụ thể</div>
                                <div className="mt-3 h-16">{userAddress.address}</div>
                            </div>
                        </div>
                        <div className="useraddress--update">
                            <WHButton type="primary" onClick={handleOpenModal}>
                                Cập nhật
                            </WHButton>
                        </div>
                    </div>
                    <div className="mx-6 bg-wh-gray w-[0.5px] max-h-[224px]"></div>
                    <div className="useraddress__map w-full max-w-[280px] max-h-[200px] pt-3">
                        <div className="useraddress__map--container h-[200px] rounded-2xl border border-wh-gray overflow-hidden">
                            <Map
                                userLocation={{ latitude: userAddress.latitude, longitude: userAddress.longitude }}
                                style={mapStyles}
                                iconSize={iconSize}
                                iconAnchor={iconAnchor}
                            ></Map>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center flex-col items-center py-6 pb-16">
                    <img className="max-w-[240px]" src={EmptyAddress} alt="" />
                    <div className="font-bold text-xl my-3 mt-8 text-center">
                        Không tìm thấy địa chỉ của bạn
                        <br />
                        Có thể bạn chưa cập nhật địa chỉ cá nhân
                    </div>
                    <WHButton type="primary" className="mt-2" onClick={handleOpenModal}>
                        Cập nhật địa chỉ
                    </WHButton>
                </div>
            )}
            <Modal
                width={600}
                title="Cập nhật địa chỉ cá nhân"
                open={modalVisibility}
                onOk={handleUpdateAddress}
                onCancel={handleModalCancel}
            >
                <Form
                    form={form}
                    name="account_address"
                    initialValues={{
                        address: userAddress?.address,
                        city: 1,
                        district: userAddress?.ward.district.id,
                        ward: userAddress?.ward.id,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                    layout="vertical"
                >
                    <div className="customer__input--location grid grid-cols-3 gap-x-6">
                        <div className="customer__input--address col-span-3">
                            <Form.Item
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cá nhân' }]}
                                validateTrigger={['onBlur']}
                            >
                                <Input
                                    label="Địa chỉ cá nhân"
                                    required
                                    type="text"
                                    name="customer_lname"
                                    placeholder="Địa chỉ"
                                    // value={formData.address}
                                    // onChange={(e) => {
                                    //     setFormData((prev) => ({ ...prev, address: e.target.value }));
                                    // }}
                                />
                            </Form.Item>
                        </div>
                        <div className="customer__input--city col-span-1">
                            <label htmlFor="customer_city" className="text-base font-medium block">
                                Tỉnh / Thành{' '}
                                <Tooltip
                                    title="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh thôi bạn nhé"
                                    className="ml-1"
                                >
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </label>
                            <Form.Item
                                name="city"
                                rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                            >
                                <Selectbox
                                    isRequired={true}
                                    name="customer_city"
                                    id=""
                                    type="tỉnh / thành phố"
                                    className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full pointer-events-none bg-gray-100"
                                    selectedValue={1}
                                    options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]}
                                    onChange={handleSelectCityChange}
                                />
                            </Form.Item>
                        </div>
                        <div className="customer__input--district col-span-1">
                            <label htmlFor="customer_district" className="text-base font-medium block">
                                Quận / Huyện
                            </label>
                            <Form.Item
                                name="district"
                                rules={[
                                    { required: true, message: 'Vui lòng chọn quận / huyện' },
                                    {
                                        validator(_, value) {
                                            if (value === 0) {
                                                return Promise.reject(new Error('Vui lòng chọn quận / huyện'));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <Selectbox
                                    isRequired={true}
                                    name="customer_district"
                                    id=""
                                    type="quận / huyện"
                                    className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
                                    selectedValue={userAddress?.ward.district.id}
                                    options={districtList.map((district): Option => {
                                        return {
                                            value: district.id.toString(),
                                            label: district.name,
                                        };
                                    })}
                                    onChange={handleSelectDistrictChange}
                                />
                            </Form.Item>
                        </div>
                        <div className="customer__input--ward col-span-1">
                            <label htmlFor="customer_ward" className="text-base font-medium block">
                                Phường / Xã
                            </label>
                            <Form.Item
                                name="ward"
                                rules={[
                                    { required: true, message: 'Vui lòng chọn phường / xã' },
                                    {
                                        validator(_, value) {
                                            if (value === 0) {
                                                return Promise.reject(new Error('Vui lòng chọn phường / xã'));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <Selectbox
                                    isRequired={true}
                                    name="customer_ward"
                                    id=""
                                    type="phường / xã"
                                    className="border border-wh-gray py-2 pl-3 mt-3 rounded w-full"
                                    selectedValue={userAddress?.ward.id}
                                    options={wardList.map((ward) => {
                                        return {
                                            value: ward.id,
                                            label: ward.name,
                                        };
                                    })}
                                    onChange={handleSelectWardChange}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default UpdateAddressContainer;
