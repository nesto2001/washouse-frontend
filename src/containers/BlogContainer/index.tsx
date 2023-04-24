import { Card } from 'antd';
import parse from 'date-fns/parse';
import dayjs from 'dayjs';
import HTMLReactParser from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogCard from '../../components/BlogCard';
import { PostModel } from '../../models/Post/PostModel';
import { getPostDetailPublic, getPublicPosts } from '../../repositories/PostRepository';
import { BlogCardData } from '../../types/BlogCardData';
import { timeSince } from '../../utils/TimeUtils';

type Props = {};

const BlogContainer = (props: Props) => {
    const [blog, setBlog] = useState<PostModel>();
    const { id } = useParams();
    const [blogs, setBlogs] = useState<BlogCardData[]>();

    useEffect(() => {
        id &&
            getPostDetailPublic(Number.parseInt(id)).then((res) => {
                setBlog(res);

                getPublicPosts().then((res2) => {
                    const blogList: BlogCardData[] = res2.map((b) => {
                        return {
                            id: b.id,
                            type: b.type,
                            thumbnail: b.thumbnail,
                            title: b.title,
                            description: b.description,
                            date: dayjs(b.createdDate, 'DD-MM-YYYY HH:mm:ss'),
                        };
                    });
                    setBlogs(blogList);
                });
            });
    }, [id]);

    return (
        <div className="px-10 -mt-16">
            <img src={blog?.thumbnail} alt="" className="object-cover max-h-60 w-full" />
            <Card className="my-4">
                <div className="blogs__wrapper h-full flex justify-center mb-4">
                    <div className="blogs__inner w-[70%] min-h-[1000px]">
                        <div className="font-bold text-4xl my-4">{blog?.title}</div>
                        <div className="text-left text-lg">{blog?.content && HTMLReactParser(blog?.content)}</div>\
                        {blog?.createdDate && (
                            <div className="text-right text-base text-ws-black my-4">
                                {timeSince(parse(blog?.createdDate, 'dd-MM-yyyy HH:mm:ss', new Date()))}
                            </div>
                        )}
                    </div>
                </div>
            </Card>
            {blogs && blogs.length > 0 && (
                <div
                    className="homepage__section--content w-full flex flex-col justify-start items-start gap-8 mb-12"
                    key={`blog-type-${blog?.type}`}
                >
                    <div className="blogs__type" id={`blog-type-${blog?.type}`}>
                        <div className="blogs__type--header text-3xl font-bold w1">Bài viết khác cùng chủ đề</div>
                    </div>
                    <div
                        className={`blogs__list--wrapper w-full flex items-center ${
                            blogs.filter((b) => b.type == blog?.type && b.id != blog.id).length >= 3
                                ? 'justify-between'
                                : 'justify-start gap-10'
                        }`}
                    >
                        {blogs
                            .filter((b) => b.type == blog?.type && b.id != blog.id)
                            .splice(0, 3)
                            .map((blog) => (
                                <BlogCard key={blog.id} {...blog} />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogContainer;
