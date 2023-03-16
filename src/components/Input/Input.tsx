import { ChangeEvent } from 'react';

type Props = {
    label?: string;
    name: string;
    type: string;
    value?: string | number | readonly string[] | undefined;
    placeholder?: string;
    required?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    inputRef?: React.RefObject<HTMLInputElement>;
    autocomplete?: string;
};

const Input = ({ label, name, type, value, onChange, placeholder, required, inputRef, autocomplete }: Props) => {
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
                className={`border border-wh-gray py-2 pl-3 ${label && 'mt-3'} rounded w-full`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autocomplete}
            />
        </>
    );
};

export default Input;
