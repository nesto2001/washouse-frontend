import React from 'react';
import Placeholder from '../../../assets/images/placeholder.png';
import Search from '../../../assets/images/search.png';
import Coupon from '../../../assets/images/coupon.png';
import Tag from '../../../assets/images/tag.png';
import Updates from '../../../assets/images/updated.png';
import ShoppingBag from '../../../assets/images/shopping-bag.png';
import ContentCard from '../../../components/ContentCard';
import { CardData } from '../../../types/CardData';
import './HomeFeatures.scss';

const HomeFeatures = () => {
    const features: CardData[] = [
        {
            id: 1,
            thumbnail: Search,
            title: 'Dễ dàng tìm kiếm',
            description:
                'Dễ dàng và nhanh chóng tìm kiếm được dịch vụ phù hợp với nhu cầu của bạn với nhiều tùy chọn lọc.',
        },
        {
            id: 2,
            thumbnail: Tag,
            title: 'Giá cả hợp lý & rõ ràng',
            description: (
                <>
                    Chúng tôi mang đến nhiều loại dịch vụ với giá cả cạnh tranh và hợp lý.
                    <br />
                    <br />
                    Giá dịch vụ được hiển thị rõ ràng trên đơn hàng. Bạn sẽ không phải trả thêm bất kỳ khoản chi phí
                    nào.
                </>
            ),
        },
        {
            id: 3,
            thumbnail: ShoppingBag,
            title: 'Thao tác tiện lợi',
            description:
                'Giao diện thân thiện, thao tác dễ dàng cho phép bạn  đặt hàng và thanh toán trực tuyến một cách dễ dàng và nhanh chóng.',
        },
        {
            id: 4,
            thumbnail: Updates,
            title: 'Cập nhật thường xuyên',
            description: 'Trạng thái đơn hàng được cập nhật thường xuyên, giúp bạn có thể theo dõi đơn hàng của mình.',
        },
        {
            id: 5,
            thumbnail: Coupon,
            title: 'Ưu đãi',
            description:
                'Cung cấp vouchers giảm giá, các chương trình giảm giá hấp dẫn giúp tiết kiệm chi phí sử dụng dịch vụ.',
        },
    ];

    return (
        <div className="features__wrapper h-full">
            <div className="homepage__section--title flex flex-col items-center mb-10">
                <div className="feature__title font-bold text-4xl text-sub mb-3 uppercase">
                    Vì sao nên chọn sử dụng dịch vụ trên washouse?
                </div>
            </div>
            <div className="homepage__section--content w-full h-full flex justify-center items-start">
                <div className="features__list--wrapper w-[77%] flex items-center justify-center mx-auto mt-20 px-11 py-4 gap-12">
                    {features.map((feature) => (
                        <ContentCard
                            id={feature.id}
                            description={feature.description}
                            thumbnail={feature.thumbnail}
                            title={feature.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeFeatures;
