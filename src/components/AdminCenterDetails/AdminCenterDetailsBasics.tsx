import { Card, Col, Row } from 'antd';
import { AdminCenterDetailedModel } from '../../models/Admin/AdminCenterDetails/AdminCenterDetailedModel';
import { getRating } from '../../utils/CommonUtils';
import RatingDistribution from '../RatingDistribution/RatingDistribution';
import RatingStars from '../RatingStars/RatingStars';
import Tags from '../Tag';

type Props = {
    centerDetails: AdminCenterDetailedModel;
};

const AdminCenterDetailsBasics = ({ centerDetails }: Props) => {
    const ratingText = centerDetails.numOfRating != 0 ? getRating(centerDetails.rating ?? 0) : 'Chưa có';

    return (
        <div className="admin__center--basics grid grid-cols-6">
            <div className="admin__center--info col-span-4 p-6">
                <Row gutter={[32, 32]}>
                    <Col span={10}>
                        <div className="w-full rounded-lg overflow-hidden">
                            <img className="w-full object-cover" src={centerDetails.thumbnail} alt="" />
                        </div>
                    </Col>
                    <Col span={14}>
                        <div className="font-bold text-xl">{centerDetails.title}</div>
                        <div className="mt-2">
                            <div className="">
                                <span className="text-sub font-medium">Địa chỉ: </span>
                                {`${centerDetails.centerAddress}, TP. Hồ Chí Minh`}
                            </div>
                            <div className="">
                                <span className="text-sub font-medium">SĐT: </span>
                                {centerDetails.centerPhone}
                            </div>
                            <div className="">
                                <span className="text-sub font-medium">MST: </span>
                                {centerDetails.taxCode}
                            </div>
                            <div className="mt-4">
                                {centerDetails.hasDelivery && (
                                    <Tags type item={{ id: 1, title: 'Dịch vụ vận chuyển' }} />
                                )}
                                {centerDetails.hasOnlinePayment && (
                                    <Tags type item={{ id: 2, title: 'Thanh toán trực tuyến' }} />
                                )}
                            </div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="font-bold text-lg">Mô tả</div>
                        <div className="mt-2">
                            <div className="text-justify">{centerDetails.description}</div>
                        </div>
                    </Col>
                    <Col span={24}>
                        <div className="font-bold text-lg">Nhận xét & Đánh giá</div>
                        <div className="flex mt-2">
                            <div className="center__rating--overall basis-2/12">
                                <div className="rating--overall p-2 pt-4 flex flex-wrap justify-center items-end rounded-lg">
                                    <span className="text-4xl font-bold text-white pl-2">{centerDetails.rating}</span>
                                    <svg width={40} height={40} viewBox="2 1 16 16">
                                        <path
                                            fill="white"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10 13.3736L12.5949 14.7111C12.7378 14.7848 12.9006 14.8106 13.0593 14.7847C13.4681 14.718 13.7454 14.3325 13.6787 13.9237L13.2085 11.0425L15.2824 8.98796C15.3967 8.8748 15.4715 8.72792 15.4959 8.569C15.5588 8.15958 15.2779 7.77672 14.8685 7.71384L11.983 7.2707L10.6699 4.66338C10.5975 4.51978 10.481 4.40322 10.3374 4.33089C9.96742 4.14458 9.51648 4.29344 9.33017 4.66338L8.01705 7.2707L5.13157 7.71384C4.97265 7.73825 4.82577 7.81309 4.71261 7.92731C4.42109 8.22158 4.42332 8.69645 4.71759 8.98796L6.79152 11.0425L6.32131 13.9237C6.29541 14.0824 6.3212 14.2452 6.39486 14.3881C6.58464 14.7563 7.03696 14.9009 7.40514 14.7111L10 13.3736Z"
                                        ></path>
                                    </svg>
                                    <div className="basis-full font-bold text-lg text-white text-center">
                                        {ratingText}
                                    </div>
                                </div>
                                <div className="rating--stars mt-2">
                                    <RatingStars rating={centerDetails.rating} starSize={28}></RatingStars>
                                </div>
                            </div>
                            <div className="border-l border-[#B3B3B3] mx-4"></div>
                            <div className="center__rating--distribution basis-4/12">
                                <RatingDistribution
                                    ratings={centerDetails.ratings}
                                    numOfRating={centerDetails.numOfRating}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="admin__center--manager col-span-2 pt-6 pr-6">
                <Card className="border-wh-gray">
                    <div className="font-bold text-lg">Quản lý</div>
                    <div className="mt-2">
                        <div className="">
                            <span className="text-sub font-medium">Họ và tên: </span>
                            {centerDetails.managerName}
                        </div>
                        <div className="">
                            <span className="text-sub font-medium">SĐT: </span>
                            {centerDetails.managerPhone}
                        </div>
                        <div className="">
                            <span className="text-sub font-medium">Email: </span>
                            {centerDetails.managerEmail}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AdminCenterDetailsBasics;
