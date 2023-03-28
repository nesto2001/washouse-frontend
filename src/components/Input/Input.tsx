import { ChangeEvent, FocusEvent } from 'react';

type Props = {
    label?: string;
    name: string;
    type: string;
    value?: string | number | readonly string[] | '';
    placeholder?: string;
    required?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
    autocomplete?: string;
    className?: string;
};

const Input = ({
    label,
    name,
    type,
    value,
    onChange,
    placeholder,
    required,
    inputRef,
    autocomplete,
    className,
    onBlur,
}: Props) => {
    return (
        <>
            {label && (
                <label htmlFor={name} className="text-base font-medium block">
                    {label}
                </label>
            )}
            <input
                ref={inputRef}
                required={required}
                type={type}
                name={name}
                className={className ?? `border border-wh-gray py-2 pl-3 ${label && 'mt-3'} rounded w-full`}
                placeholder={placeholder}
                value={value ?? ''}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete={autocomplete}
            />
        </>
    );
};

export default Input;
