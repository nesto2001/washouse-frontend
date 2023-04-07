import CenterTimelineOverallContainer from '../../../containers/StaffContainer/CenterCalendarContainer/CenterTimelineOverallContainer';

type Props = {};

const StaffDayTimelinePage = () => {
    return (
        <>
            <div className="flex">
                <div className="bg-white basis-full mx-auto rounded border border-wh-lightgray">
                    <div className="provider__page--title pt-4 pl-6 font-semibold text-2xl">Đặt lịch</div>
                    <div className="provider__page--subtitle mt-2 pl-6 text-sub-gray text-base">
                        Quản lý đơn hàng dễ dàng hơn chế độ xem lịch
                    </div>
                    <div className="provider__page--content px-6 mt-8">
                        <div className="provider__calender--wrapper"></div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-4">
                <CenterTimelineOverallContainer />
            </div>
        </>
    );
};

export default StaffDayTimelinePage;
