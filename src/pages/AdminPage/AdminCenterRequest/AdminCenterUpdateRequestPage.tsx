import AdminCenterUpdateRequestsContainer from '../../../containers/AdminContainer/CenterRequestsContainer/AdminCenterUpdateRequestsContainer';

type Props = {};

const AdminCenterUpdateRequestPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Cập nhật trung tâm</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Quản lý các yêu cầu cập nhật trung tâm có trong hệ thống
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__services--wrapper">
                        <AdminCenterUpdateRequestsContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCenterUpdateRequestPage;
