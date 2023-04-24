import { Link } from 'react-router-dom';
import { BlogCardData } from '../../types/BlogCardData';

const BlogCard = ({ id, thumbnail, title, description, date }: BlogCardData) => {
    return (
        <Link to={`/blogs/${id}`}>
            <div className="blogcard flex flex-col basis-1/3 max-w-[350px]">
                <div className="blogcard__content--thumbnail rounded-2xl max-h-[200px] flex align-start justify-center overflow-hidden">
                    <img className="object-cover" src={thumbnail} alt="" />
                </div>
                <div className="blogcard__content--title font-semibold text-base text-ellipsis line-clamp-2 text-left mt-2 min-h-[3rem]">
                    {title}
                </div>
                <div className="blogcard__content--description text-ellipsis line-clamp-4 text-justify mt-3 min-h-[6rem]">
                    {description}
                </div>
                <div className="blogcard__content--date text-left text-xs mt-4">{date.format('DD-MM-YYYY')}</div>
            </div>
        </Link>
    );
};

export default BlogCard;
