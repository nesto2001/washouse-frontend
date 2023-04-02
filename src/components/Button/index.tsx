import clsx from 'clsx';
import { Link } from 'react-router-dom';
import './Button.scss';

type Props = {
    children?: string | JSX.Element;
    type?: string;
    link?: string;
    uppercase?: boolean;
    minWidth?: string;
    fontSize?: string;
    form?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isSubmit?: boolean;
    style?: React.CSSProperties;
    disable?: boolean;
    className?: string;
    size?: 'small' | 'normal' | 'large';
};

const WHButton = ({
    children,
    type,
    link,
    uppercase,
    minWidth,
    fontSize,
    form,
    onClick,
    isSubmit,
    style,
    disable,
    className,
    size,
}: Props) => {
    const btnStyle = { ...(style ?? ''), minWidth: minWidth || '164px', fontSize: fontSize || '16px' };
    return (
        <>
            <button
                className={clsx('btn', type ? type : '', uppercase && 'uppercase', className ?? '')}
                type={isSubmit ? 'submit' : 'button'}
                style={btnStyle}
                form={form ?? ''}
                onClick={onClick}
                disabled={disable}
            >
                {link ? (
                    <Link to={link}>
                        <div className={size === 'small' ? 'px-3 py-2' : size === 'large' ? 'px-8 py-4' : 'px-6 py-3'}>
                            {children}
                        </div>
                    </Link>
                ) : (
                    <div className={size === 'small' ? 'px-3 py-2' : size === 'large' ? 'px-8 py-4' : 'px-6 py-3'}>
                        {children}
                    </div>
                )}
            </button>
        </>
    );
};

export default WHButton;
