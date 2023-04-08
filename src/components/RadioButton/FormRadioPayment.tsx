import { DeliveryOption } from '../../types/DeliveryOption';
import { DeliveryEnum } from '../../types/enum/DeliveryEnum';
import { PaymentEnum } from '../../types/enum/PaymentEnum';
import { Option } from '../../types/Options';
import './RadioButton.scss';

type Props = {
    name: string;
    optionsList: Option[];
    selectedValue?: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormRadioPayment = ({ optionsList, name, selectedValue, onChange }: Props) => {
    return (
        <></>
        // <div className="formradio__wrapper my-3 border border-wh-gray rounded-lg">
        //     {optionsList.map((option) => {
        //         return (
        //             <div
        //                 className="formradio--item px-5 py-6 flex justify-between border-b border-wh-gray last:border-none"
        //                 key={option.value}
        //             >
        //                 <label className="radio-container">
        //                     <input
        //                         type="radio"
        //                         name={name}
        //                         value={option.value}
        //                         checked={parseInt(option.value.toString()) === selectedValue}
        //                         onChange={onChange}
        //                     />
        //                     <span className="checkmark !m-0"></span>
        //                     <span className="form-radio-label text-md">
        //                         {option.value === PaymentEnum.COD
        //                             ? 'Thanh toán khi nhận hàng (COD)'
        //                             : option.value === PaymentEnum.VnPay
        //                             ? 'Ví điện tử Momo'
        //                             : ''}
        //                     </span>
        //                 </label>
        //             </div>
        //         );
        //     })}
        // </div>
    );
};

export default FormRadioPayment;
