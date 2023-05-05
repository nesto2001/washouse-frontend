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
    noPlaceholder?: boolean;
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
    noPlaceholder,
    type,
}: SelectboxProps) => {
    return (
        <select
            key={id}
            onChange={onChange}
            name={name}
            id={id}
            className={clsx(className, 'selectbox')}
            ref={ref}
            required={isRequired}
            defaultValue={selectedValue}
        >
            {!noPlaceholder && (
                <option key="0" value="0">
                    Chọn {type ?? 'một tùy chọn'}
                </option>
            )}
            {options.map((option, index) => (
                <option selected={option.value === selectedValue} key={`option-${index}`} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Selectbox;
