import React from 'react';
import { Option } from '../../types/Options';
import './RadioButton.scss';

type Props = {
    name: string;
    optionsList: Option[];
};

const Radio = ({ optionsList, name }: Props) => {
    return (
        <>
            {optionsList.map((option) => {
                return (
                    <>
                        <label className="radio-container">
                            <input type="radio" name={name} value={option.value} />
                            <span className="checkmark"></span>
                            <span className="radio-label">{option.label}</span>
                        </label>
                    </>
                );
            })}
        </>
    );
};

export default Radio;
