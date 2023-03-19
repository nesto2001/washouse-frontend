import clsx from 'clsx';
import React from 'react';
import { Option } from '../../types/Options';
import './RadioButton.scss';

type Props = {
    name: string;
    optionsList: Option[];
    inline?: boolean;
    defaultValue?: number | string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Radio = ({ optionsList, name, inline, defaultValue, onChange }: Props) => {
    return (
        <>
            {optionsList.map((option) => {
                return (
                    <label className={clsx('radio-container', inline && 'radio-inline')} key={`radio-${option.value}`}>
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            defaultChecked={option.value === defaultValue}
                            onChange={onChange}
                        />
                        <span className="checkmark"></span>
                        <span className="radio-label">{option.label}</span>
                    </label>
                );
            })}
        </>
    );
};

export default Radio;
