import { useEffect } from 'react';
import style from './Loading.module.scss';
import { ReactComponent as WashingMachine } from '../../assets/images/washing-machine.svg';
import clsx from 'clsx';

type Props = {
    screen?: boolean;
};

const Loading = ({ screen }: Props) => {
    useEffect(() => {
        if (screen) {
            document.body.style.overflow = 'hidden';
        }
    }, []);
    return (
        <div
            className={clsx(
                'flex flex-col items-center justify-center font-medium',
                !screen && 'max-h-[640px] h-screen',
                screen && 'absolute bg-white top-0 h-[929px] w-full left-0 z-[9999]',
            )}
        >
            <WashingMachine className={clsx('w-[80px] mb-4', style.loading_machine, screen && '-mt-10')} />
            Đang tải trang... <br />
            Bạn chờ chút nhé!
        </div>
    );
};

export default Loading;
