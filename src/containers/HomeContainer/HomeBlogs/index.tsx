import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import BlogCard from '../../../components/BlogCard';
import { getPublicPosts } from '../../../repositories/PostRepository';
import { BlogCardData } from '../../../types/BlogCardData';
import { BlogType } from '../../../types/BlogType';
import './HomeBlogs.scss';

type Props = {};

const HomeBlogs = (props: Props) => {
    const [blogs, setBlogs] = useState<BlogCardData[]>([]);
    const blogTypes: BlogType[] = [
        {
            id: 'System',
            name: 'Hệ thống',
        },
        {
            id: 'Lifestyle',
            name: 'Đời sống',
        },
        {
            id: 'Promotions',
            name: 'Khuyến mãi',
        },
    ];

    useEffect(() => {
        getPublicPosts().then((res) => {
            setBlogs(
                res.map((blog) => {
                    return {
                        id: blog.id,
                        type: blog.type,
                        thumbnail: blog.thumbnail,
                        title: blog.title,
                        description: blog.description,
                        date: dayjs(blog.createdDate, 'DD-MM-YYYY HH:mm:ss'),
                    };
                }),
            );
        });
    }, []);

    return (
        <div className="blogs__wrapper h-full flex justify-center">
            <div className="blogs__inner w-[77%]">
                <div className="homepage__section--title flex flex-col items-center mb-12">
                    <div className="blogs__title font-bold text-4xl text-sub">Chuyện giặt ủi</div>
                </div>
                {blogTypes.map((type) => {
                    const blogsFiltered = blogs.filter((blog) => blog.type === type.id);
                    return (
                        blogsFiltered.length > 0 && (
                            <div
                                className="homepage__section--content w-full flex flex-col justify-start items-start gap-8 mb-12"
                                key={`blog-type-${type.id}`}
                            >
                                <div className="blogs__type" id={`blog-type-${type.id}`}>
                                    <div className="blogs__type--header text-3xl font-bold w1">{type.name}</div>
                                </div>
                                <div
                                    className={`blogs__list--wrapper w-full flex items-center ${
                                        blogsFiltered.length >= 3 ? 'justify-between' : 'justify-start gap-10'
                                    }`}
                                >
                                    {blogsFiltered.splice(0, 3).map((blog) => (
                                        <BlogCard key={blog.id} {...blog} />
                                    ))}
                                </div>
                            </div>
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default HomeBlogs;
