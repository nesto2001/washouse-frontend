import { Button, Modal, message } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import Placeholder from '../../assets/images/placeholder.png';
import { CenterModel } from '../../models/Center/CenterModel';
import { approveCenter, rejectCenter } from '../../repositories/RequestRepository';

type Props = {
    centerRequests: CenterModel[];
    openDetail: (center: CenterModel) => void;
};

const CenterList = ({ centerRequests, openDetail }: Props) => {
    return (
        <div className="centerrq__list--wrapper my-5 mt-2">
            <div className="centerrq__list">
                {centerRequests.map((req: CenterModel) => (
                    <div
                        className="centerrq__list--item flex border-b border-wh-gray py-2 pb-4 mb-2 cursor-pointer"
                        onClick={() => openDetail(req)}
                    >
                        <div className="centerrq__item--thumb h-[160px] rounded overflow-hidden basis-1/5">
                            <img className="w-full h-full object-cover" src={req.thumbnail ?? Placeholder} alt="" />
                        </div>
                        <div className="centerrq__item--content ml-4 w-[600px] basis-3/5 flex flex-col justify-start">
                            <div className="centerrq__item--title text-primary font-bold text-lg">{req.title}</div>
                            <div className="centerrq__item--address flex gap-2 text-base">
                                {req.address}, TP. Hồ Chí Minh
                            </div>
                            <div className="flex items-center">
                                <div className="centerrq__item--centerrqId text-base font-medium text-sub-gray">
                                    ID: {req.id}
                                </div>
                                <div className="w-[2px] h-5 mt-0.5 bg-wh-gray mx-2"></div>
                                <div className="centerrq__item--category text-base font-medium text-sub-gray">
                                    {req.phone}
                                </div>
                            </div>
                            <div className="centerrq__item--address flex gap-2 text-base">{req.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CenterList;
