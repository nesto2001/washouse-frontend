import React from 'react';
import { Option } from '../../types/Options';
import './Checkbox.scss';

type Props = {
    name: string;
    optionsList: Option[];
    checked?: boolean;
    selectedValues?: string[];
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox = ({ optionsList, name, checked, selectedValues, onChange }: Props) => {
    return (
        <>
            {optionsList.map((option) => {
                return (
                    <label className="checkbox-container" key={`checkbox-${option.value}`}>
                        <input
                            type="checkbox"
                            name={name}
                            value={option.value}
                            onChange={onChange}
                            checked={selectedValues && selectedValues.includes(option.value.toString())}
                        />
                        <span className="checkbox-checkmark"></span>
                        <span className="checkbox-label">{option.label}</span>
                    </label>
                );
            })}
        </>
    );
};

export default Checkbox;
