import clsx from 'clsx';
import React, { useState } from 'react';
import { Option } from '../../types/Options';

import './Selectbox.scss';

interface SelectboxProps {
    options: Option[];
    id: string;
    name?: string;
    ref?: React.MutableRefObject<HTMLSelectElement>;
    isRequired?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    selectedValue?: number;
    type?: string;
}

const Selectbox = ({
    options,
    id,
    name,
    ref,
    isRequired,
    onChange,
    className,
    selectedValue,
    type,
}: SelectboxProps) => {
    return (
        <select
            onChange={onChange}
            name={name}
            id={id}
            className={clsx(className, 'selectbox')}
            ref={ref}
            required={isRequired}
        >
            <option value="0">Chọn {type ?? 'một tùy chọn'}</option>
            {options.map((option) => (
                <option key={option.value} value={option.value} selected={selectedValue === option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Selectbox;
