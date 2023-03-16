import clsx from 'clsx';
import React from 'react';
import { Option } from '../../types/Options';
import './RadioButton.scss';

type Props = {
    name: string;
    optionsList: Option[];
    inline?: boolean;
};

const Radio = ({ optionsList, name, inline }: Props) => {
    return (
        <>
            {optionsList.map((option) => {
                return (
                    <>
                        <label className={clsx('radio-container', inline && 'radio-inline')}>
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
