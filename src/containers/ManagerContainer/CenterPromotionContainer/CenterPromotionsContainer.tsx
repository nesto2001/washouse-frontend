import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PromotionModel } from '../../../models/Promotion/PromotionModel';
import { getPromotions } from '../../../repositories/PromotionRepository';
import { formatDateEn } from '../../../utils/TimeUtils';
import { formatPercentage } from '../../../utils/FormatUtils';
type Props = {};

const CenterPromotionsContainer = (props: Props) => {
    const location = useLocation();
    const [promotions, setPromotions] = useState<PromotionModel[]>();
    const columns: ColumnsType<PromotionModel> = [
        {
            title: 'Mã',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Mã Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            align: 'center',
            key: 'discount',
            render(_, record) {
                return <div>{formatPercentage(record.discount)}</div>;
            },
        },
        {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            align: 'center',
            key: 'startDate',
            render(_, record) {
                return <div>{formatDateEn(record.startDate)}</div>;
            },
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: 'expireDate',
            align: 'center',
            key: 'expireDate',
            render(_, record) {
                return <div>{formatDateEn(record.expireDate)}</div>;
            },
        },
        {
            title: 'Đã sử dụng',
            dataIndex: 'useTimes',
            align: 'center',
            key: 'useTimes',
        },
        {
            title: 'Thao tác',
            render(_, record) {
                return <div className="text-red cursor-pointer">Hủy mã khuyến mãi</div>;
            },
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            return await getPromotions();
        };
        fetchData().then((res) => {
            setPromotions(res);
        });
    }, []);

    return (
        <div className="provider__promotions--filter">
            <Table dataSource={promotions} columns={columns} loading={promotions == null}></Table>
        </div>
    );
};

export default CenterPromotionsContainer;
