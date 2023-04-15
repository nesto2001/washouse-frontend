import UpdateServiceContainer from '../../../containers/ManagerContainer/CenterServicesContainer/UpdateServiceContainer';

type Props = {};

const ManagerUpdateServicePage = () => {
    return (
        <>
            <div className="bg-white w-1/2 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Cập nhật dịch vụ</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Cập nhật dịch vụ tại trung tâm
                </div>
                <div className="provider__page--content px-6 my-8">
                    <div className="provider__services--wrapper">
                        <UpdateServiceContainer />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManagerUpdateServicePage;
