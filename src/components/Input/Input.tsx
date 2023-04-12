import { useState, useEffect } from 'react';
import { Space } from 'antd';
import { ChangeEvent, FocusEvent } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

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
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            {label && (
                <label htmlFor={name} className="text-base font-medium block">
                    {label}
                </label>
            )}
            {type == 'password' ? (
                <Space.Compact
                    className={className ?? `border border-wh-gray py-2 pl-3 ${label && 'mt-3'} rounded w-full`}
                >
                    <input
                        ref={inputRef}
                        required={required}
                        type={showPassword ? 'text' : type}
                        name={name}
                        placeholder={placeholder}
                        className="w-full"
                        value={value ?? undefined}
                        onChange={onChange ?? undefined}
                        onBlur={onBlur ?? undefined}
                        autoComplete={autocomplete}
                    />
                    <button
                        className="password-toggle-button bg-transparent text-base mr-3"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword);
                        }}
                    >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    </button>
                </Space.Compact>
            ) : (
                <input
                    ref={inputRef}
                    required={required}
                    type={type}
                    name={name}
                    className={className ?? `border border-wh-gray py-2 pl-3 ${label && 'mt-3'} rounded w-full`}
                    placeholder={placeholder}
                    value={value ?? undefined}
                    onChange={onChange ?? undefined}
                    onBlur={onBlur ?? undefined}
                    autoComplete={autocomplete}
                />
            )}
        </>
    );
};

export default Input;
