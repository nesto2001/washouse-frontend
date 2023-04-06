import CenterPromotionsContainer from '../../../containers/ManagerContainer/CenterPromotionContainer/CenterPromotionsContainer';

const ManagerPromotionsPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Khuyến mãi</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Quản lý các mã khuyến mãi của trung tâm.
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__services--wrapper">
                        <CenterPromotionsContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerPromotionsPage;
