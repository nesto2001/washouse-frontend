import React, { useState } from 'react';
import { Option } from '../../types/Options';

import './Selectbox.scss';

interface SelectboxProps {
    options: Option[];
    id: string;
}

const Selectbox = ({ options, id }: SelectboxProps) => {
    const [selectedValue, setSelectedValue] = useState<number>();

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(Number(event.target.value));
    };

    return (
        <select value={selectedValue} onChange={handleSelectChange} name="" id={id} className="selectbox">
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
