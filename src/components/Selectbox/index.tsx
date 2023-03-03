import React, { useState } from 'react';
import { Option } from '../../types/Options';

import './Selectbox.scss';

interface SelectboxProps {
    options: Option[];
    id: string;
    name?: string;
    ref?: React.MutableRefObject<HTMLSelectElement>;
}

const Selectbox = ({ options, id, name, ref }: SelectboxProps) => {
    const [selectedValue, setSelectedValue] = useState<number>();

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(Number(event.target.value));
    };

    return (
        <select value={selectedValue} onChange={handleSelectChange} name={name} id={id} className="selectbox" ref={ref}>
            <option value="">Select an option</option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Selectbox;
