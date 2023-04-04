import LoginBanner from '../../assets/images/login-banner-staff.svg';
import Background from '../../assets/images/vector-bg-3.png';

type Props = {
    children?: JSX.Element;
};

const StaffAuthenticateLayout = ({ children }: Props) => {
    return (
        <>
            <div className="main flex justify-start">
                <>
                    {children}
                    <div className="login__banner absolute right-0 h-screen w-full -z-10">
                        <div className="login__banner--background max-h-[931px] max-w-[1107px] h-full w-2/3 text-right mr-0 float-right">
                            <img className="float-right" src={Background} alt="" />
                        </div>
                        <div className="login__banner--decoration absolute z-10 top-1/4 right-0 translate-y-5 my-auto w-1/2 max-w-[880px] float-right">
                            <img className="" src={LoginBanner} alt="" />
                        </div>
                        <div className="login__banner--text absolute z-10 top-20 right-24 text-white text-right">
                            <h1 className="text-4xl capitalize font-bold -translate-x-0.5">
                                Nền tảng quản lý trực tuyến
                            </h1>
                            <h3 className="text-2xl mt-3 font-semibold float-right">
                                Hiệu quả, đơn giản, tiết kiệm hơn
                            </h3>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
};

export default StaffAuthenticateLayout;
