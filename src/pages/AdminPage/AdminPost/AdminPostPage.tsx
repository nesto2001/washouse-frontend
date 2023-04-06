import AdminCentersContainer from '../../../containers/AdminContainer/CenterContainer/AdminCentersContainer';
import AdminCenterRequestsContainer from '../../../containers/AdminContainer/CenterRequestsContainer/AdminCenterRequestsContainer';
import AdminPostsContainer from '../../../containers/AdminContainer/PostContainer/AdminPostsContainer';

type Props = {};

const AdminPostPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Bài đăng</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                    Quản lý các bài đăng của hệ thống
                </div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__services--wrapper">
                        <AdminPostsContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPostPage;
