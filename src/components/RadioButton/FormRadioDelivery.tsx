import { DeliveryOption } from '../../types/DeliveryOption';
import { DeliveryEnum } from '../../types/enum/DeliveryEnum';
import { Option } from '../../types/Options';
import './RadioButton.scss';

type Props = {
    name: string;
    optionsList: DeliveryOption[];
    isValued?: boolean;
    selectedValue?: number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormRadioDelivery = ({ optionsList, name, isValued, selectedValue, onChange }: Props) => {
    return (
        <div className="formradio__wrapper my-3 border border-wh-gray rounded-lg">
            {/* {optionsList.map((option) => {
                return (
                    <div
                        className="formradio--item p-5 flex justify-between border-b border-wh-gray last:border-none"
                        key={option.type}
                    >
                        <label className="radio-container pt-1">
                            <input
                                type="radio"
                                name={name}
                                value={option.type}
                                data-value={option.freight}
                                checked={option.type === selectedValue}
                                onChange={onChange}
                            />
                            <span className="checkmark"></span>
                            <span className="form-radio-label text-md">
                                {option.type === DeliveryEnum.NO
                                    ? 'Không sử dụng dịch vụ vận chuyển'
                                    : option.type === DeliveryEnum.TWO_WAY
                                    ? 'Vận chuyển 2 chiều'
                                    : `Vận chuyển 1 chiều ${option.type === DeliveryEnum.ONE_WAY_TO ? 'đi' : 'về'}`}
                            </span>
                        </label>
                        {isValued && (
                            <>
                                <label className="formradio__item--value text-md">
                                    <span className="font-bold mr-1">{option.freight}</span>đ
                                </label>
                            </>
                        )}
                    </div>
                );
            })} */}
        </div>
    );
};

export default FormRadioDelivery;
