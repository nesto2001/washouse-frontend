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
}: Props) => {
    const btnStyle = { ...(style ?? ''), minWidth: minWidth || '164px', fontSize: fontSize || '16px' };
    return (
        <>
            <button
                className={clsx('btn', type ? type : '', uppercase && 'uppercase')}
                type={isSubmit ? 'submit' : 'button'}
                style={btnStyle}
                form={form ?? ''}
                onClick={onClick}
                disabled={disable}
            >
                {link ? <Link to={link}>{children}</Link> : children}
            </button>
        </>
    );
};

export default WHButton;
