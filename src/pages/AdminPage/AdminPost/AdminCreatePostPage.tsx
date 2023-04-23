import AdminCreatePostContainer from '../../../containers/AdminContainer/PostContainer/AdminCreatePostContainer';

type Props = {};

const AdminCreatePostPage = () => {
    return (
        <div className="flex gap-4">
            <div className="bg-white basis-2/3 mx-auto rounded border border-wh-lightgray">
                <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Bài đăng</div>
                <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">Tạo bài đăng mới</div>
                <div className="provider__page--content px-6 mt-8">
                    <div className="provider__services--wrapper">
                        <AdminCreatePostContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCreatePostPage;
