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

const TermContainer = (props: Props) => {
    const [blog, setBlog] = useState<PostModel>();
    const { id } = useParams();
    const [blogs, setBlogs] = useState<BlogCardData[]>();

    return (
        <div className="px-10 -mt-16">
            <img src={blog?.thumbnail} alt="" className="object-cover max-h-60 w-full" />
            <Card className="my-4">
                <div className="blogs__wrapper h-full flex justify-center mb-4">
                    <div className="blogs__inner w-[70%] min-h-[1000px]">
                        <div className="font-bold text-4xl my-4">{'Điều khoản sử dụng'}</div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TermContainer;
