import { Progress } from 'antd';
import StarFull from '../Star/StarFull';

function RatingDistribution({ ratings, numOfRating }: { ratings: number[]; numOfRating?: number }) {
    return (
        <>
            {ratings.map((rating, index) => (
                <div className="flex items-center gap-1">
                    <StarFull numOfStar={1} /> <span className="text-base font-medium pt-0.5 mr-2">{++index}</span>
                    <Progress
                        percent={(rating * 100) / ratings.reduce((prev, current) => prev + current, 0)}
                        status="normal"
                        style={{ margin: 0 }}
                        showInfo={false}
                    />
                </div>
            ))}
        </>
    );
}

export default RatingDistribution;
