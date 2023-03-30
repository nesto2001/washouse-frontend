import { useEffect } from 'react';
import clsx from 'clsx';
import EmptyDataIMG from '../../assets/images/empty-data.png';

type Props = {
    screen?: boolean;
};

const EmptyData = ({ screen }: Props) => {
    useEffect(() => {
        if (screen) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);
    return (
        <div
            className={clsx(
                'flex flex-col items-center justify-center font-medium',
                !screen && 'max-h-[640px] h-screen',
                screen && 'absolute bg-white top-0 h-[929px] w-full left-0 z-[9999]',
            )}
        >
            <div className={clsx('mb-4', !screen && 'w-[240px] -mt-20', screen && '-mt-10 w-[100px]')}>
                <img src={EmptyDataIMG} alt="" />
            </div>
            <div className="text-xl mt-4">
                Thông tin hiện tại chưa khả dụng <br />
                Vui lòng thử lại sau
            </div>
        </div>
    );
};

export default EmptyData;
