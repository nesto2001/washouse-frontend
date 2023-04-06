import React, { useState, useEffect } from 'react';
import { ManagerCenterModel } from '../../../models/Manager/ManagerCenterModel';
import { Button, Form, Input, Modal, Select, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { LocationModel } from '../../../models/Location/LocationModel';
import Map from '../../../components/Map/Map';
import { QuestionCircleOutlined, DownOutlined } from '@ant-design/icons';
import { getDistricts, getLocation, getWards } from '../../../repositories/LocationRepository';
import { LocationDetailsModel } from '../../../models/Location/LocationDetailsModel';
import { LocationPlaceModel } from '../../../models/LocationPlaceModel';
import { Option } from '../../../types/Options';

type Props = {
    center: ManagerCenterModel;
    centerAddress: LocationDetailsModel;
};

type CenterAddressFormData = { address: string; ward: number; district: number; city: number; location: LocationModel };

const mapStyles: React.CSSProperties = {
    height: '100%',
    width: '100%',
};

const iconSize: L.PointExpression = [30, 30];
const iconAnchor: L.PointExpression = [15, 15];

const CenterAddress = ({ center, centerAddress }: Props) => {
    const [modalVisibility, setModalVisibility] = useState<boolean>(false);
    const [district, setDistrict] = useState<LocationPlaceModel>();
    const [districtList, setDistrictList] = useState<LocationPlaceModel[]>([]);
    const [wardList, setWardList] = useState<LocationPlaceModel[]>([]);

    const [formData, setFormData] = useState<CenterAddressFormData>({
        address: centerAddress.address ?? '',
        ward: centerAddress.ward.id ?? 0,
        city: 1,
        district: centerAddress.ward.district.id ?? 0,
        location: {
            latitude: centerAddress.latitude ?? 0,
            longitude: centerAddress.longitude ?? 0,
        },
    });

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            return await getDistricts();
        };
        fetchData().then((res) => {
            setDistrictList(res);
            const fetchData = async () => {
                return await getWards(centerAddress.ward.district.id);
            };
            fetchData().then((res) => {
                setWardList(res);
            });
        });
    }, []);

    useEffect(() => {
        console.log(wardList);
    }, []);

    const handleSelectDistrictChange = (value: number) => {
        setFormData((prev) => ({ ...prev, district: value }));
        const fetchData = async () => {
            return await getWards(value);
        };
        fetchData().then((res) => {
            setWardList(res);
        });
    };

    const handleSelectWardChange = (value: number) => {
        console.log(value);
        console.log(form.getFieldValue(['centerLocation', 'centerWard']));
        setFormData((prev) => ({ ...prev, ward: value }));
    };
    useEffect(() => {
        console.log(form.getFieldValue(['centerLocation', 'centerWard']));
    }, [form.getFieldValue(['centerLocation', 'centerWard'])]);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setModalVisibility(false);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleOpenModal = () => {
        setModalVisibility(true);
    };

    const handleUpdateAddress = () => {
        form.submit();
    };

    const handleModalCancel = () => {
        centerAddress &&
            form.setFieldsValue({
                address: centerAddress.address,
                city: 1,
                centerLocation: {
                    centerDistrict: centerAddress.ward.district.id,
                },
            });
        setInterval(() => {
            centerAddress &&
                form.setFieldsValue({
                    centerLocation: {
                        centerWard: centerAddress.ward.id,
                    },
                });
        }, 1000);
        setModalVisibility(false);
    };
    return (
        <div className="p-6 text-sub text-base">
            {center && centerAddress && (
                <>
                    <div className="useraddress--content flex justify-between pl-14 pr-6 mb-16">
                        <div className="useraddress--details">
                            <div className="useraddress--user flex justify-start items-center">
                                <div className="font-medium">{center.title}</div>
                                <div className="mx-3 border bg-wh-gray w-[0.5px] h-6"></div>
                                <div className="text-sm text-sub-gray">{center.phone}</div>
                            </div>
                            <div className="useraddress--address grid grid-cols-3 mt-5 gap-y-6">
                                <div className="col-span-1 min-w-[150px] flex flex-col">
                                    <div className="font-medium text-sub-gray">Tỉnh / thành phố</div>
                                    <div className="mt-3">TP. Hồ Chí Minh</div>
                                </div>
                                <div className="col-span-1 min-w-[150px] flex flex-col">
                                    <div className="font-medium text-sub-gray">Quận / huyện</div>
                                    <div className="mt-3">{centerAddress.ward.district.name}</div>
                                </div>
                                <div className="col-span-1 min-w-[150px] flex flex-col">
                                    <div className="font-medium text-sub-gray">Phường / xã</div>
                                    <div className="mt-3">{centerAddress.ward.name}</div>
                                </div>
                                <div className="col-span-3 min-w-[140px] flex flex-col">
                                    <div className="font-medium text-sub-gray">Địa chỉ cụ thể</div>
                                    <div className="mt-3 h-16">{centerAddress.address}</div>
                                </div>
                            </div>
                            <div className="useraddress--update">
                                <Button type="primary" onClick={handleOpenModal}>
                                    Cập nhật
                                </Button>
                            </div>
                        </div>
                        <div className="mx-6 bg-wh-gray w-[0.5px] max-h-[224px]"></div>
                        <div className="useraddress__map w-full max-w-[280px] max-h-[200px] pt-3">
                            <div className="useraddress__map--container h-[200px] rounded-2xl border border-wh-gray overflow-hidden">
                                <Map
                                    userLocation={{
                                        latitude: centerAddress.latitude,
                                        longitude: centerAddress.longitude,
                                    }}
                                    style={mapStyles}
                                    iconSize={iconSize}
                                    iconAnchor={iconAnchor}
                                ></Map>
                            </div>
                        </div>
                    </div>
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
                                        label="Địa chỉ trung tâm"
                                        initialValue={formData.address ?? centerAddress.address}
                                    >
                                        <Input
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
                                        initialValue={1}
                                        rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố' }]}
                                    >
                                        <Select id="" options={[{ label: 'TP. Hồ Chí Minh', value: 1 }]} />
                                    </Form.Item>
                                </div>
                                <div className="customer__input--district col-span-1">
                                    <label htmlFor="customer_district" className="text-base font-medium block">
                                        Quận / Huyện
                                    </label>
                                    <Form.Item
                                        initialValue={formData.district ?? centerAddress.ward.district.id}
                                        name={['centerLocation', 'centerDistrict']}
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
                                        <Select
                                            id=""
                                            options={districtList.map((district): Option => {
                                                return {
                                                    value: district.id,
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
                                        initialValue={formData.ward ?? centerAddress.ward.id}
                                        name={['centerLocation', 'centerWard']}
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
                                        <Select
                                            id=""
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
                </>
            )}
        </div>
    );
};

export default CenterAddress;
