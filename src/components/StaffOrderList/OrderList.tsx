import { Empty, Pagination, Spin } from 'antd';
import { PaginationProps } from 'rc-pagination';
import { CenterOrderModel } from '../../models/Staff/CenterOrderModel';
import { Paging } from '../../types/Common/Pagination';
import OrderCard from './OrderCard';

type Props = {
    orders: CenterOrderModel[];
    isLoading: boolean;
    paging?: Paging;
    updatePage: (page: number) => void;
};

const OrderList = ({ orders, isLoading, paging, updatePage }: Props) => {
    const showTotal: PaginationProps['showTotal'] = (total) => `Có tất cả ${total} đơn hàng`;

    return (
        <div className={`order__list--wrapper my-5 mt-2 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            <div className="order__list--header mb-6 py-4 bg-wh-lightgray font-bold text-sub rounded-lg">
                <div className="flex justify-between px-4 text-base">
                    <div className="w-[380px]">Dịch vụ</div>
                    <div className="w-[138px] mr-3">Tổng đơn hàng</div>
                    <div className="w-[72px] mr-3">Giảm giá</div>
                    <div className="w-[120px] mr-3">Thanh toán</div>
                    <div className="w-[82px] mr-3">Ngày đặt</div>
                    <div className="w-[82px] mr-3">Trạng thái</div>
                </div>
            </div>
            {isLoading ? (
                <div className="flex w-full justify-center">
                    <Spin />
                </div>
            ) : !orders || orders.length == 0 ? (
                <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    imageStyle={{ height: 160, width: 384, margin: '0 auto', marginBottom: 20 }}
                    description={<span className="text-xl font-medium text-sub-gray">Chưa có đơn hàng nào</span>}
                ></Empty>
            ) : (
                <div className="order__list">
                    {orders.map((order) => order && <OrderCard key={order.id} order={order} />)}
                </div>
            )}
            <Pagination
                className="float-right"
                showTotal={showTotal}
                defaultCurrent={paging?.pageNumber}
                total={paging?.totalItems}
                onChange={(page) => updatePage(page)}
                pageSize={paging?.itemsPerPage}
                showSizeChanger={false}
            />
        </div>
    );
};

export default OrderList;
