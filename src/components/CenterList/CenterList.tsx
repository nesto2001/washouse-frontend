import { message } from 'antd';
import { useEffect, useState } from 'react';
import Placeholder from '../../assets/images/placeholder.png';
import { CenterModel } from '../../models/Center/CenterModel';
import { approveCenter, getCenterRequests, rejectCenter } from '../../repositories/RequestRepository';
import WHButton from '../Button';

type Props = {
    centerRequests: CenterModel[];
};

const CenterList = ({centerRequests}: Props) => {

    const handleApprove = (id: number) => {
        const approve = async () => {
            return await approveCenter(id);
        };
        approve()
            .then((res) => {
                if (res) {
                    message.success(`Đã chấp thuận yêu cầu duyệt trung tâm ${res.title}`);
                }
            })
            .catch((error) => {
                if (error) {
                    message.error(`Đã xảy ra lỗi trong quá trình xét duyệt, vui lòng thử lại sau.`);
                }
            });
    };

    const handleReject = (id: number) => {
        const reject = async () => {
            return await rejectCenter(id);
        };
        reject()
            .then((res) => {
                if (res) {
                    message.success(`Đã từ chối yêu cầu duyệt trung tâm ${res.title}`);
                }
            })
            .catch((error) => {
                if (error) {
                    message.error(`Đã xảy ra lỗi trong quá trình xét duyệt, vui lòng thử lại sau.`);
                }
            });
    };

    return (
        <div className="centerrq__list--wrapper my-5 mt-2">
            <div className="centerrq__list">
                {centerRequests.map((req) => (
                    <div className="centerrq__list--item flex border-b border-wh-gray py-2 pb-4 mb-2">
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
                        <div className="centerrq__item--price basis-1/5 text-right">
                            <div className="centerrq__item--price text-primary font-bold text-2xl">
                                <WHButton type="sub" onClick={() => handleReject(req.id)}>
                                    Từ chối
                                </WHButton>
                                <div className="my-5"></div>
                                <WHButton type="primary" onClick={() => handleApprove(req.id)}>
                                    Chấp thuận
                                </WHButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CenterList;
