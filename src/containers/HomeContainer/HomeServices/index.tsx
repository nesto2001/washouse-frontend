import { useEffect, useState } from 'react';
import Placeholder from '../../../assets/images/placeholder.png';
import LogoText from '../../../assets/images/washouse-textonly.png';
import Carousel from '../../../components/Carousel';
import ServiceCard from '../../../components/ServiceCard';
import { ServiceCategoryDetailModel } from '../../../models/Category/ServiceCategoryDetailModel';
import { getServiceCategories } from '../../../repositories/ServiceCategoryRepository';
import { CardData } from '../../../types/CardData';
import { splitDescription } from '../../../utils/CommonUtils';

const HomeServices = () => {
    const [serviceCategories, setServiceCategories] = useState<ServiceCategoryDetailModel[]>();
    useEffect(() => {
        getServiceCategories().then((res) => setServiceCategories(res));
    }, []);

    return (
        <div className="service__wrapper h-full">
            <div className="homepage__section--title flex flex-col items-center mb-10">
                <div className="service__title font-bold text-4xl text-sub mb-3">
                    CÁC LOẠI HÌNH DỊCH VỤ GIẶT ỦI CÓ MẶT TRÊN
                </div>
                <div className="service__title--logo w-1/3 max-w-[303px] h-[44px] overflow-hidden">
                    <img className="object-cover" src={LogoText} alt="" />
                </div>
            </div>
            <div className="homepage__section--content">
                <div className="service__slider--wrapper mx-40">
                    {serviceCategories && (
                        <Carousel
                            items={serviceCategories.map((serviceCategory) => {
                                return (
                                    <ServiceCard
                                        cardData={{
                                            id: serviceCategory.categoryId,
                                            description: splitDescription(serviceCategory.description, 140),
                                            thumbnail: serviceCategory.image,
                                            title: serviceCategory.categoryName,
                                        }}
                                    ></ServiceCard>
                                );
                            })}
                        ></Carousel>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeServices;
