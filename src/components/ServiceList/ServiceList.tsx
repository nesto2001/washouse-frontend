import { Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import React from 'react';
import Placeholder from '../../assets/images/placeholder.png';
import { formatCurrency } from '../../utils/FormatUtils';
import RatingStars from '../RatingStars/RatingStars';
import { ManagerServiceItem } from '../../models/Manager/ManagerServiceItem';
type Props = {
    serviceList: ManagerServiceItem[];
    layout: 'grid' | 'list' | 'table';
};

type servicesType = {
    id: number;
    name: string;
    category: string;
    image: string | null;
    priceType: boolean;
    price: number;
    isAvailable: boolean;
    status: string;
    rating: number;
    numOfRating: number;
};

// const services: servicesType[] = [
//     {
//         id: 1,
//         name: 'Giặt sấy quần áo tổng hợp',
//         category: 'Dịch vụ giặt sấy',
//         priceType: false,
//         image: 'download-20230317075207.png',
//         price: 35000,
//         isAvailable: true,
//         status: 'Approved',
//         rating: 4.5,
//         numOfRating: 15,
//     },
//     {
//         id: 7,
//         name: 'Giặt sấy quần áo trắng',
//         category: 'Dịch vụ giặt sấy',
//         priceType: false,
//         image: null,
//         price: 40000,
//         isAvailable: true,
//         status: 'Approved',
//         rating: 4.8,
//         numOfRating: 12,
//     },
//     {
//         id: 9,
//         name: 'Giặt hấp áo len',
//         category: 'Dịch vụ giặt hấp',
//         priceType: false,
//         image: 'download-20230317075207.png',
//         price: 45000,
//         isAvailable: false,
//         status: 'Approved',
//         rating: 4.9,
//         numOfRating: 48,
//     },
// ];

const columns: ColumnsType<ManagerServiceItem> = [
    {
        title: 'Mã',
        dataIndex: 'id',
        key: 'id',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Tên dịch vụ',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Phân loại',
        dataIndex: 'categoryId',
        key: 'category',
    },
    {
        title: 'Định lượng',
        dataIndex: 'pricetype',
        key: 'pricetype',
        render: (value) => (value ? 'Khối lượng' : 'Số lượng'),
    },
    {
        title: 'Đơn giá',
        dataIndex: 'price',
        key: 'price',
        render: (value) => formatCurrency(value ?? 0),
    },
    {
        title: 'Đánh giá',
        dataIndex: 'rating',
        key: 'rating',
        render: (_, record) =>
            record.rating && record.numOfRating > 0 ? record.rating + '/' + record.numOfRating : 'Chưa có',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Thao tác',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Chỉnh sửa</a>
                <a>Xóa</a>
            </Space>
        ),
    },
];

const ServiceList = ({ serviceList, layout }: Props) => {
    // if (layout === 'grid') {
    //     return (
    //         <div className="service__list--wrapper">
    //             <div className="service__list grid grid-cols-4 gap-x-2 gap-y-5">
    //                 <div className="service__list--item col-span-1 border border-wh-gray p-2 rounded-xl">
    //                     <div className="service__item--thumb h-[120px] rounded overflow-hidden">
    //                         <img className="w-full h-full object-cover" src={Placeholder} alt="" />
    //                     </div>
    //                     <div className="service__item--content mt-2">
    //                         <div className="service__item--title text-primary font-bold text-lg">{service.name}</div>
    //                         <div className="service__item--price text-primary font-medium text-base">
    //                             {service.priceType ? '' : formatCurrency(service.price??0)}
    //                         </div>

    //                         <div className="service__item--rating flex gap-2">
    //                             <RatingStars rating={service.rating} /> {service.numOfRating}
    //                         </div>
    //                         <hr className="my-2 border-wh-gray" />
    //                         <div className="flex justify-between items-center mb-1">
    //                             <div className="service__item--category inline rounded-md text-sm font-medium text-primary border border-wh-primary px-2 py-1">
    //                                 Dịch vụ giặt sấy
    //                             </div>
    //                             <div className="service__item--serviceId text-lg font-bold text-primary">
    //                                 ID: #{service.id}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="service__list--item col-span-1 border border-wh-gray p-2 rounded-xl">
    //                     <div className="service__item--thumb h-[120px] rounded overflow-hidden">
    //                         <img className="w-full h-full object-cover" src={Placeholder} alt="" />
    //                     </div>
    //                     <div className="service__item--content mt-2">
    //                         <div className="service__item--title text-primary font-bold text-lg">{service.name}</div>
    //                         <div className="service__item--price text-primary font-medium text-base">
    //                             {service.priceType ? '' : formatCurrency(service.price)}
    //                         </div>

    //                         <div className="service__item--rating flex gap-2">
    //                             <RatingStars rating={service.rating} /> {service.numOfRating}
    //                         </div>
    //                         <hr className="my-2 border-wh-gray" />
    //                         <div className="flex justify-between items-center mb-1">
    //                             <div className="service__item--category inline rounded-md text-sm font-medium text-primary border border-wh-primary px-2 py-1">
    //                                 Dịch vụ giặt sấy
    //                             </div>
    //                             <div className="service__item--serviceId text-lg font-bold text-primary">
    //                                 ID: #{service.id}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="service__list--item col-span-1 border border-wh-gray p-2 rounded-xl">
    //                     <div className="service__item--thumb h-[120px] rounded overflow-hidden">
    //                         <img className="w-full h-full object-cover" src={Placeholder} alt="" />
    //                     </div>
    //                     <div className="service__item--content mt-2">
    //                         <div className="service__item--title text-primary font-bold text-lg">{service.name}</div>
    //                         <div className="service__item--price text-primary font-medium text-base">
    //                             {service.priceType ? '' : formatCurrency(service.price)}
    //                         </div>

    //                         <div className="service__item--rating flex gap-2">
    //                             <RatingStars rating={service.rating} /> {service.numOfRating}
    //                         </div>
    //                         <hr className="my-2 border-wh-gray" />
    //                         <div className="flex justify-between items-center mb-1">
    //                             <div className="service__item--category inline rounded-md text-sm font-medium text-primary border border-wh-primary px-2 py-1">
    //                                 Dịch vụ giặt sấy
    //                             </div>
    //                             <div className="service__item--serviceId text-lg font-bold text-primary">
    //                                 ID: #{service.id}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="service__list--item col-span-1 border border-wh-gray p-2 rounded-xl">
    //                     <div className="service__item--thumb h-[120px] rounded overflow-hidden">
    //                         <img className="w-full h-full object-cover" src={Placeholder} alt="" />
    //                     </div>
    //                     <div className="service__item--content mt-2">
    //                         <div className="service__item--title text-primary font-bold text-lg">{service.name}</div>
    //                         <div className="service__item--price text-primary font-medium text-base">
    //                             {service.priceType ? '' : formatCurrency(service.price)}
    //                         </div>

    //                         <div className="service__item--rating flex gap-2">
    //                             <RatingStars rating={service.rating} /> {service.numOfRating}
    //                         </div>
    //                         <hr className="my-2 border-wh-gray" />
    //                         <div className="flex justify-between items-center mb-1">
    //                             <div className="service__item--category inline rounded-md text-sm font-medium text-primary border border-wh-primary px-2 py-1">
    //                                 Dịch vụ giặt sấy
    //                             </div>
    //                             <div className="service__item--serviceId text-lg font-bold text-primary">
    //                                 ID: #{service.id}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="service__list--item col-span-1 border border-wh-gray p-2 rounded-xl">
    //                     <div className="service__item--thumb h-[120px] rounded overflow-hidden">
    //                         <img className="w-full h-full object-cover" src={Placeholder} alt="" />
    //                     </div>
    //                     <div className="service__item--content mt-2">
    //                         <div className="service__item--title text-primary font-bold text-lg">{service.name}</div>
    //                         <div className="service__item--price text-primary font-medium text-base">
    //                             {service.priceType ? '' : formatCurrency(service.price)}
    //                         </div>

    //                         <div className="service__item--rating flex gap-2">
    //                             <RatingStars rating={service.rating} /> {service.numOfRating}
    //                         </div>
    //                         <hr className="my-2 border-wh-gray" />
    //                         <div className="flex justify-between items-center mb-1">
    //                             <div className="service__item--category inline rounded-md text-sm font-medium text-primary border border-wh-primary px-2 py-1">
    //                                 Dịch vụ giặt sấy
    //                             </div>
    //                             <div className="service__item--serviceId text-lg font-bold text-primary">
    //                                 ID: #{service.id}
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // } else if (layout === 'list') {
    //     return (
    //         <div className="service__list--wrapper my-5 mt-2">
    //             <div className="service__list">
    //                 <div className="service__list--item flex border-b border-wh-gray py-2 pb-4 mb-2">
    //                     <div className="service__item--thumb h-[160px] rounded overflow-hidden basis-1/5">
    //                         <img className="w-full h-full object-cover" src={Placeholder} alt="" />
    //                     </div>
    //                     <div className="service__item--content ml-4 w-[600px] basis-3/5 flex flex-col justify-between">
    //                         <div className="service__item--title text-primary font-bold text-lg">{service.name}</div>
    //                         <div className="flex items-center">
    //                             <div className="service__item--serviceId text-base font-medium text-sub-gray">
    //                                 ID: {service.id}
    //                             </div>
    //                             <div className="w-[2px] h-5 mt-0.5 bg-wh-gray mx-2"></div>
    //                             <div className="service__item--category text-base font-medium text-sub-gray">
    //                                 Dịch vụ giặt sấy
    //                             </div>
    //                         </div>

    //                         <div className="service__item--rating flex gap-2">
    //                             <RatingStars rating={service.rating} /> {service.numOfRating}
    //                         </div>
    //                         <div className="flex justify-between items-center mb-1"></div>
    //                     </div>
    //                     <div className="service__item--price basis-1/5 text-right">
    //                         <div className="service__item--price text-primary font-bold text-2xl">
    //                             {service.priceType ? '' : formatCurrency(service.price)}
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="service__list--item flex border-b border-wh-gray py-2 pb-4 mb-2">
    //                     <div className="service__item--thumb h-[160px] rounded overflow-hidden basis-1/5">
    //                         <img className="w-full h-full object-cover" src={Placeholder} alt="" />
    //                     </div>
    //                     <div className="service__item--content ml-4 w-[600px] basis-3/5 flex flex-col justify-between">
    //                         <div className="service__item--title text-primary font-bold text-lg">{service.name}</div>
    //                         <div className="flex items-center">
    //                             <div className="service__item--serviceId text-base font-medium text-sub-gray">
    //                                 ID: {service.id}
    //                             </div>
    //                             <div className="w-[2px] h-5 mt-0.5 bg-wh-gray mx-2"></div>
    //                             <div className="service__item--category text-base font-medium text-sub-gray">
    //                                 Dịch vụ giặt sấy
    //                             </div>
    //                         </div>

    //                         <div className="service__item--rating flex gap-2">
    //                             <RatingStars rating={service.rating} /> {service.numOfRating}
    //                         </div>
    //                         <div className="flex justify-between items-center mb-1"></div>
    //                     </div>
    //                     <div className="service__item--price basis-1/5 text-right">
    //                         <div className="service__item--price text-primary font-bold text-2xl">
    //                             {service.priceType ? '' : formatCurrency(service.price)}
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="service__list--item flex border-b border-wh-gray py-2 pb-4 mb-2">
    //                     <div className="service__item--thumb h-[160px] rounded overflow-hidden basis-1/5">
    //                         <img className="w-full h-full object-cover" src={Placeholder} alt="" />
    //                     </div>
    //                     <div className="service__item--content ml-4 w-[600px] basis-3/5 flex flex-col justify-between">
    //                         <div className="service__item--title text-primary font-bold text-lg">{service.name}</div>
    //                         <div className="flex items-center">
    //                             <div className="service__item--serviceId text-base font-medium text-sub-gray">
    //                                 ID: {service.id}
    //                             </div>
    //                             <div className="w-[2px] h-5 mt-0.5 bg-wh-gray mx-2"></div>
    //                             <div className="service__item--category text-base font-medium text-sub-gray">
    //                                 Dịch vụ giặt sấy
    //                             </div>
    //                         </div>

    //                         <div className="service__item--rating flex gap-2">
    //                             <RatingStars rating={service.rating} /> {service.numOfRating}
    //                         </div>
    //                         <div className="flex justify-between items-center mb-1"></div>
    //                     </div>
    //                     <div className="service__item--price basis-1/5 text-right">
    //                         <div className="service__item--price text-primary font-bold text-2xl">
    //                             {service.priceType ? '' : formatCurrency(service.price)}
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="service__list--item flex border-b border-wh-gray py-2 pb-4 mb-2">
    //                     <div className="service__item--thumb h-[160px] rounded overflow-hidden basis-1/5">
    //                         <img className="w-full h-full object-cover" src={Placeholder} alt="" />
    //                     </div>
    //                     <div className="service__item--content ml-4 w-[600px] basis-3/5 flex flex-col justify-between">
    //                         <div className="service__item--title text-primary font-bold text-lg">{service.name}</div>
    //                         <div className="flex items-center">
    //                             <div className="service__item--serviceId text-base font-medium text-sub-gray">
    //                                 ID: {service.id}
    //                             </div>
    //                             <div className="w-[2px] h-5 mt-0.5 bg-wh-gray mx-2"></div>
    //                             <div className="service__item--category text-base font-medium text-sub-gray">
    //                                 Dịch vụ giặt sấy
    //                             </div>
    //                         </div>

    //                         <div className="service__item--rating flex gap-2">
    //                             <RatingStars rating={service.rating} /> {service.numOfRating}
    //                         </div>
    //                         <div className="flex justify-between items-center mb-1"></div>
    //                     </div>
    //                     <div className="service__item--price basis-1/5 text-right">
    //                         <div className="service__item--price text-primary font-bold text-2xl">
    //                             {service.priceType ? '' : formatCurrency(service.price)}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // } else {
    return (
        <div className="service__list--wrapper my-5 mt-2">
            <div className="service__list">
                <Table columns={columns} dataSource={serviceList} />
            </div>
        </div>
    );
};
// };

export default ServiceList;
