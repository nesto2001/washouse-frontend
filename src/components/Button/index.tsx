import clsx from 'clsx';
import { Link } from 'react-router-dom';
import './Button.scss';

type Props = {
    children?: string;
    type?: string;
    link?: string;
    uppercase?: boolean;
    minWidth?: string;
    fontSize?: string;
    form?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, type, link, uppercase, minWidth, fontSize, form, onClick }: Props) => {
    const style = {
        minWidth: minWidth || '164px',
        fontSize: fontSize || '16px',
    };
    return (
        <>
            <button
                className={clsx('btn', type ? type : '', uppercase && 'uppercase')}
                style={style}
                form={form ?? ''}
                onClick={onClick}
            >
                {link ? <Link to={link}>{children}</Link> : children}
            </button>
        </>
    );
};

export default Button;
