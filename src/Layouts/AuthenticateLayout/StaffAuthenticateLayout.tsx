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
                        <div className="login__banner--background max-h-[931px] h-full w-2/3 text-right mr-0 float-right">
                            <img className="float-right" src={Background} alt="" />
                        </div>
                        <div className="login__banner--decoration absolute z-10 top-1/4 translate-y-10 left-32 my-auto w-1/3 max-w-[622px]">
                            <img className="" src={LoginBanner} alt="" />
                        </div>
                        <div className="login__banner--text absolute z-10 top-20 left-24 text-white">
                            <h1 className="text-4xl capitalize font-bold -translate-x-0.5">Nhanh chóng và tiện lợi</h1>
                            <h3 className="text-2xl mt-3 font-semibold translate-x-12 w-2/3 text-left">
                                Dễ dàng hơn cho cuộc sống nhộn nhịp của bạn.
                            </h3>
                        </div>
                    </div>
                </>
            </div>
        </>
    );
};

export default StaffAuthenticateLayout;
