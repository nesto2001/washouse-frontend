import { Button, Form, FormInstance, Input, Modal, Select, Space, Tooltip, Upload } from 'antd';
import DefaultOptionType from 'antd/es/select';
import TextArea from 'antd/es/input/TextArea';
import React, { useState, useEffect, useMemo } from 'react';
import { LocationPlaceModel } from '../../../models/LocationPlaceModel';
import { getDistricts, getWards, searchLocation } from '../../../repositories/LocationRepository';
import { CreateCenterFormData } from '.';
import { LocationType } from '../../../types/LocationType';
import LocationMap from '../../../components/Map/LocationMap';
import Destination from '../../../assets/images/destination.png';
import { AddressModel } from '../../../models/Location/AddressModel';

const { Option } = Select;

type Props = {
    setFormData: React.Dispatch<React.SetStateAction<CreateCenterFormData>>;
    formData: CreateCenterFormData;
    setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
    formInstance: FormInstance;
};

const CenterContactForm = ({ setFormData, setIsValidated, formData, formInstance }: Props) => {
    const [districtsList, setDistrictsList] = useState<LocationPlaceModel[]>([]);
    const [wardsList, setWardsList] = useState<LocationPlaceModel[]>([]);
    const [city, setCity] = useState<LocationPlaceModel>({ id: 0, name: 'TP. Hồ Chí Minh' });
    const [district, setDistrict] = useState<LocationPlaceModel>();
    const [openMap, setOpenMap] = useState<boolean>(false);
    const [location, setLocation] = useState<LocationType>({ latitude: 0, longitude: 0 });
    const [addressString, setAddressString] = useState<string>('');
    const [fullAddress, setFullAddress] = useState<string>('');
    const [centerAddress, setCenterAddress] = useState<AddressModel>();

    const onFinish = (values: any) => {
        console.log('Success:', values);
        const address = values.centerAddress;
        const wardId = values.centerLocation.centerWard;
        const fetchData = async () => {
            return await searchLocation(address, wardId);
        };
        fetchData().then((res) => {
            setFormData((prevFormData) => ({
                ...prevFormData,
                location: { latitude: res.latitude, longitude: res.longitude },
            }));
            setLocation(res);
            setOpenMap(true);
        });

        setIsValidated(true);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        setIsValidated(false);
    };

    const handleChange = (value: string) => {
        setWardsList([]);
        const fetchData = async () => {
            return await getWards(parseInt(value));
        };
        fetchData().then((res) => {
            setWardsList(res);
        });
    };

    const handleWardChange = (value: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            wardId: parseInt(value),
            districtId: district ? district.id : 0,
        }));
    };

    useEffect(() => {
        setIsValidated(false);
        const fetchData = async () => {
            return await getDistricts();
        };
        fetchData().then((res) => {
            setDistrictsList(res);
        });
    }, []);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
            },
        }));
    }, [location, centerAddress]);

    return (
        <div className="p-6 text-sub text-base">
            <Form
                form={formInstance}
                name="contact"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 900 }}
                initialValues={{
                    centerAddress: formData.address,
                    centerLocation: {
                        centerDistrict: formData.districtId !== 0 ? formData.districtId : undefined,
                        centerWard: formData.wardId !== 0 ? formData.wardId : undefined,
                    },
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Địa chỉ"
                    name="centerAddress"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ trung tâm' }]}
                    style={{ maxWidth: 700 }}
                >
                    <Input
                        style={{ maxWidth: 700 }}
                        onChange={(e) => {
                            setFormData((prevFormData) => ({ ...prevFormData, address: e.target.value }));
                            setAddressString(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item label="Khu vực" style={{ maxWidth: 700 }}>
                    <Space.Compact>
                        <Form.Item noStyle name={['centerLocation', 'centerCity']}>
                            <Tooltip title="Washouse hiện tại chỉ khả dụng tại TP. Hồ Chí Minh thôi bạn nhé">
                                <Select
                                    placeholder="Select province"
                                    defaultValue="0"
                                    options={[{ value: '0', label: 'TP. Hồ Chí Minh' }]}
                                    disabled
                                ></Select>
                            </Tooltip>
                        </Form.Item>
                        <Form.Item
                            name={['centerLocation', 'centerDistrict']}
                            noStyle
                            rules={[{ required: true, message: 'Vui lòng chọn quận / huyện  ' }]}
                        >
                            <Select
                                placeholder="Chọn quận / huyện"
                                options={districtsList.map((district) => {
                                    return {
                                        value: district.id.toString(),
                                        label: district.name,
                                    };
                                })}
                                onChange={handleChange}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '')
                                        .toLowerCase()
                                        .localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                style={{ minWidth: 164 }}
                            ></Select>
                        </Form.Item>
                        <Form.Item
                            name={['centerLocation', 'centerWard']}
                            noStyle
                            rules={[{ required: true, message: 'Vui lòng chọn phường / xã' }]}
                        >
                            <Select
                                placeholder="Chọn phường / xã"
                                options={wardsList.map((ward) => {
                                    return {
                                        value: ward.id.toString(),
                                        label: ward.name,
                                    };
                                })}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '')
                                        .toLowerCase()
                                        .localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                onChange={handleWardChange}
                                style={{ minWidth: 164 }}
                            ></Select>
                        </Form.Item>
                    </Space.Compact>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }} style={{ marginLeft: 10 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!!formInstance.getFieldsError().filter(({ errors }) => errors.length).length}
                    >
                        Chọn vị trí
                    </Button>
                </Form.Item>
            </Form>
            {/* <div className="col-span-2">Tên trung tâm</div>
    <div className="col-span-3"></div> */}
            <Modal
                open={openMap}
                title="Chọn vị trí"
                okText="Chọn"
                cancelText="Hủy"
                onCancel={() => setOpenMap(false)}
                onOk={() => {
                    setOpenMap(false);
                    Modal.destroyAll();
                }}
                maskClosable={true}
                destroyOnClose={true}
                bodyStyle={{ position: 'relative' }}
                cancelButtonProps={{ style: { background: 'white' } }}
            >
                <LocationMap
                    location={location}
                    setLocation={setLocation}
                    addressLocation={formData.location}
                    setFullAddress={setFullAddress}
                    setCenterAddress={setCenterAddress}
                />
                <div className="absolute bottom-0 w-full bg-white z-[9999] flex p-4 gap-3">
                    <div className="w-[40px] h-[40px]">
                        <img className="object-cover" src={Destination} alt="" />
                    </div>
                    <div className="">
                        <div className="font-bold text-base">{centerAddress?.addressName || addressString}</div>
                        <div className="">{centerAddress?.displayName}</div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CenterContactForm;
