import React from 'react';

type Props = {
    numOfStar: number;
};

const DEFAULT_STAR_SIZE = 24;

const StarFull = ({ numOfStar }: Props) => {
    const starSize = DEFAULT_STAR_SIZE;
    const fullStars = Math.floor(numOfStar);
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, index) => (
                <svg key={`full-star-${index}`} width={starSize} height={starSize} viewBox="2 2 15 15">
                    <path
                        fill="rgba(57,106,252,1)"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 13.3736L12.5949 14.7111C12.7378 14.7848 12.9006 14.8106 13.0593 14.7847C13.4681 14.718 13.7454 14.3325 13.6787 13.9237L13.2085 11.0425L15.2824 8.98796C15.3967 8.8748 15.4715 8.72792 15.4959 8.569C15.5588 8.15958 15.2779 7.77672 14.8685 7.71384L11.983 7.2707L10.6699 4.66338C10.5975 4.51978 10.481 4.40322 10.3374 4.33089C9.96742 4.14458 9.51648 4.29344 9.33017 4.66338L8.01705 7.2707L5.13157 7.71384C4.97265 7.73825 4.82577 7.81309 4.71261 7.92731C4.42109 8.22158 4.42332 8.69645 4.71759 8.98796L6.79152 11.0425L6.32131 13.9237C6.29541 14.0824 6.3212 14.2452 6.39486 14.3881C6.58464 14.7563 7.03696 14.9009 7.40514 14.7111L10 13.3736Z"
                    ></path>
                </svg>
            ))}
        </div>
    );
};

export default StarFull;
