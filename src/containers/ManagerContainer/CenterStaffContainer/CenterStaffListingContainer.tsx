import { Form, Input, Select, Space } from 'antd';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Stafflist from '../../../components/StaffList/Stafflist';
import { CenterStaffModel } from '../../../models/Staff/CenterStaffModel';
import { getAllStaff } from '../../../repositories/StaffRepository';

type Props = {};

const searchType = [
    { value: 'name', label: 'Tên nhân viên' },
    { value: 'id', label: 'Mã nhân viên' },
];

export type SearchParamsData = {
    searchString: string | null;
    searchType: string | null;
};

const CenterStaffListingContainer = (props: Props) => {
    const navigate = useNavigate();
    const [centerStaff, setCenterStaff] = useState<CenterStaffModel[]>();
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useState<SearchParamsData>({
        searchString: '',
        searchType: 'name',
    });
    const [state, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        getAllStaff().then((res) => {
            setCenterStaff(res.items);
        });
    }, [searchParams, state]);

    return (
        <>
            <div className="provider__services--filter">
                <Form
                    form={form}
                    name="service"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 1200 }}
                    initialValues={{}}
                    autoComplete="off"
                    size="large"
                >
                    <div className="flex flex-wrap justify-between">
                        <Form.Item className="basis-1/2 mb-1">
                            <Space.Compact size="large">
                                <Form.Item name={['search', 'type']} style={{ width: 130 }}>
                                    <Select defaultValue="name" options={searchType} />
                                </Form.Item>
                                <Form.Item
                                    name={['search', 'string']}
                                    rules={[{ min: 2, message: 'Vui lòng nhập tối thiểu 2 ký tự' }]}
                                    style={{ width: 260, flexGrow: 1 }}
                                >
                                    <Input
                                        defaultValue=""
                                        placeholder="Vui lòng nhập tối thiểu 2 ký tự"
                                        onChange={(e) => {
                                            setSearchParams((prevData) => ({
                                                ...prevData,
                                                searchString: e.target.value ?? null,
                                            }));
                                        }}
                                    />
                                </Form.Item>
                            </Space.Compact>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div className="provider__services mt-12 mb-72">
                <Stafflist centerStaff={centerStaff} forceUpdate={forceUpdate} />
            </div>
        </>
    );
};

export default CenterStaffListingContainer;
