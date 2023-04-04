import { Link } from 'react-router-dom';
import BackgroundSm from '../../../assets/images/vector-bg-4.png';
import Logo from '../../../assets/images/washouse-tagline.png';
import StaffLoginContainer from '../../../containers/AuthContainer/StaffLoginContainer';

type Props = {};

const StaffLoginPage = () => {
    return (
        <>
            <div className="login__form h-screen basis-2/5 flex items-center px-5 pl-48 text-sub relative">
                <div className="login__form--inner flex flex-col justify-center text-left pr-20 pl-32 -mt-[80px]">
                    <div className="site__logo w-1/3 min-w-[285px] -mb-3">
                        <Link to="/">
                            <img src={Logo} alt="" />
                        </Link>
                    </div>
                    <h1 className="font-bold text-4xl mt-6">Đăng nhập</h1>
                    <h2 className="text-xl font-semibold mt-1">Chào mừng bạn đã quay trở lại!</h2>
                    <div className="login__form--input mt-3">
                        <StaffLoginContainer />
                    </div>
                </div>
                <div className="login__form--decoration left-0 bottom-0 absolute -z-10 max-w-[480px]">
                    <img src={BackgroundSm} alt="" />
                </div>
            </div>
        </>
    );
};

export default StaffLoginPage;
