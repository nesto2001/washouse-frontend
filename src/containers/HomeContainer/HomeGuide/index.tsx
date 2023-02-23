import React from 'react';
import Placeholder from '../../../assets/images/placeholder.png';
import HorizontalContentCard from '../../../components/HorizontalContentCard';
import Step1 from '../../../assets/images/step1.png';
import Step2 from '../../../assets/images/step2.png';
import Step3 from '../../../assets/images/step3.png';
import Step4 from '../../../assets/images/step4.png';
import { CardData } from '../../../types/CardData';

type Props = {};

const HomeGuide = (props: Props) => {
    const steps: CardData[] = [
        {
            id: 1,
            thumbnail: Step1,
            title: 'Chọn trung tâm',
            description: 'Lựa chọn trung tâm giặt ủi phù hợp với nhu cầu của bạn nhất',
        },
        {
            id: 2,
            thumbnail: Step2,
            title: 'Chọn dịch vụ',
            description: (
                <>
                    Lựa chọn dịch vụ do trung tâm cung cấp mà bạn muốn sử dụng, tùy theo trung tâm có thể cung cấp dịch
                    vụ vận chuyển hoặc bạn có thể đặt dịch vụ trước và đến trực tiếp trung tâm
                </>
            ),
        },
        {
            id: 3,  
            thumbnail: Step3,
            title: 'Tiến hành dịch vụ',
            description: (
                <>
                    Trung tâm sẽ xác nhận đơn hàng của bạn sau đó nhân viên sẽ đến địa chỉ được cung cấp trong khoảng
                    thời gian bạn chọn để nhận đồ, giao cho trung tâm để xử lý và giao đồ.
                    <br />
                    <br />
                    Nếu bạn chọn tự mang đồ đến trung tâm, hãy tranh thủ đến trung tâm trong khoảng thời gian bạn chọn
                    nhé!
                </>
            ),
        },
        {
            id: 4,
            thumbnail: Step4,
            title: 'Đánh giá và xếp hạng',
            description:
                'Bạn có thể đánh giá chất lượng dịch vụ thông qua ứng dụng Washouse hoặc thông qua Website Washouse.',
        },
    ];

    return (
        <div className="guide__wrapper h-full">
            <div className="homepage__section--title flex flex-col items-center">
                <div className="guide__title font-bold text-4xl uppercase text-sub">Quy trình sử dụng dịch vụ</div>
            </div>
            <div className="homepage__section--content w-full h-full flex justify-center items-start">
                <div className="guide__steps--wrapper w-[70%] max-w-[960px] flex flex-wrap items-center justify-center mx-auto mt-20 py-4 gap-12">
                    {steps.map((step) => (
                        <HorizontalContentCard
                            id={step.id}
                            description={step.description}
                            thumbnail={step.thumbnail}
                            title={step.title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeGuide;
