import { Button, Form, FormInstance, Input, Modal, Select, Space, Tooltip, Upload } from 'antd';
import DefaultOptionType from 'antd/es/select';
import TextArea from 'antd/es/input/TextArea';
import React, { useState, useEffect, useMemo } from 'react';
import { LocationPlaceModel } from '../../../models/LocationPlaceModel';
import { getDistricts, getWards, searchLocation } from '../../../repositories/LocationRepository';
import { CreateCenterFormData } from '.';
import { LocationType } from '../../../types/LocationType';
import LocationMap from '../../../components/Map/LocationMap';

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
        setIsValidated(true);
        const fetchData = async () => {
            return await getDistricts();
        };
        fetchData().then((res) => {
            setDistrictsList(res);
        });
    }, []);

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
                    centerLocation: { centerDistrict: formData.districtId, centerWard: formData.wardId },
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
                        style={{ maxWidth: 413 }}
                        onChange={(e) => {
                            setFormData((prevFormData) => ({ ...prevFormData, address: e.target.value }));
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
            <Modal open={openMap} title="Chọn vị trí" okText="Create" cancelText="Cancel" onOk={() => {}}>
                <LocationMap setLocation={setLocation} addressLocation={formData.location} />
            </Modal>
        </div>
    );
};

export default CenterContactForm;
