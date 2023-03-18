import Placeholder from '../../../assets/images/placeholder.png';
import BlogCard from '../../../components/BlogCard';
import { BlogCardData } from '../../../types/BlogCardData';
import { BlogType } from '../../../types/BlogType';
import './HomeBlogs.scss';

type Props = {};

const HomeBlogs = (props: Props) => {
    const blogTypes: BlogType[] = [
        {
            id: 1,
            type: 'Khuyến mãi',
        },
        {
            id: 2,
            type: 'Đời sống',
        },
    ];

    const blogs: BlogCardData[] = [
        {
            id: 1,
            type: 1,
            thumbnail: Placeholder,
            title: 'Mừng Tết đến, nhận ngay voucher giảm 15% các dịch vụ giặt ủi!',
            description:
                'Để chào đón năm mới, Washouse mến tặng cho bạn voucher giảm giá 15% trên tất cả các dịch vụ giặt ủi có trên nền tảng. Nhập mã voucher "TET2023" khi đặt dịch vụ để áp dụng ưu đãi này. Hãy nhanh tay đặt dịch vụ và tận hưởng mùa Tết với quần áo sạch sẽ và thơm tho. Chúc mừng năm mới!',
            date: new Date('02/23/2023'),
        },
        {
            id: 2,
            type: 1,
            thumbnail: Placeholder,
            title: 'abc',
            description:
                'Để chào đón năm mới, Washouse mến tặng cho bạn voucher giảm giá 15% trên tất cả các dịch vụ giặt ủi có trên nền tảng. Nhập mã voucher "TET2023" khi đặt dịch vụ để áp dụng ưu đãi này. Hãy nhanh tay đặt dịch vụ và tận hưởng mùa Tết với quần áo sạch sẽ và thơm tho. Chúc mừng năm mới!',
            date: new Date('02/23/2023'),
        },
        {
            id: 3,
            type: 2,
            thumbnail: Placeholder,
            title: 'abc',
            description: 'abc',
            date: new Date('02/23/2023'),
        },
        {
            id: 4,
            type: 2,
            thumbnail: Placeholder,
            title: 'abc',
            description: 'abc',
            date: new Date('02/23/2023'),
        },
        {
            id: 5,
            type: 2,
            thumbnail: Placeholder,
            title: 'abc',
            description: 'abc',
            date: new Date('02/23/2023'),
        },
        {
            id: 6,
            type: 1,
            thumbnail: Placeholder,
            title: 'abc',
            description: 'abc',
            date: new Date('02/23/2023'),
        },
    ];
    return (
        <div className="blogs__wrapper h-full flex justify-center">
            <div className="blogs__inner w-[77%]">
                <div className="homepage__section--title flex flex-col items-center mb-12">
                    <div className="blogs__title font-bold text-4xl text-sub">Chuyện giặt ủi</div>
                </div>
                {blogTypes.map((type) => {
                    const blogsFiltered = blogs.filter((blog) => blog.type === type.id);
                    return (
                        <div
                            className="homepage__section--content w-full flex flex-col justify-start items-start gap-8 mb-12"
                            key={`blog-type-${type.id}`}
                        >
                            <div className="blogs__type" id={`blog-type-${type.id}`}>
                                <div className="blogs__type--header text-3xl font-bold w1">{type.type}</div>
                            </div>
                            <div className="blogs__list--wrapper w-full flex items-center justify-between">
                                {blogsFiltered.splice(0, 3).map((blog) => (
                                    <BlogCard key={blog.id} {...blog} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomeBlogs;
