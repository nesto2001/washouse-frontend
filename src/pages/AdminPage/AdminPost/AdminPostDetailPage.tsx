import AdminCreatePostContainer from '../../../containers/AdminContainer/PostContainer/AdminCreatePostContainer';
import AdminPostDetailContainer from '../../../containers/AdminContainer/PostContainer/AdminPostDetailContainer';

type Props = {};

const AdminPostDetailPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Bài đăng</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">Chi tiết bài đăng</div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__services--wrapper">
                        <AdminPostDetailContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPostDetailPage;
