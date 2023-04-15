import { Pagination, Spin } from 'antd';
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
                    <div className="w-[400px]">Dịch vụ</div>
                    <div className="w-[110px] mr-3">Tổng đơn hàng</div>
                    <div className="w-[86px] mr-3">Giảm giá</div>
                    <div className="w-[100px] mr-3">Thanh toán</div>
                    <div className="w-[100px] mr-3">Ngày đặt</div>
                    <div className="w-[88px] mr-3">Trạng thái</div>
                    <div className="w-[200px]">Thao tác</div>
                </div>
            </div>
            {isLoading ? (
                <div className="flex w-full justify-center">
                    <Spin />
                </div>
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
