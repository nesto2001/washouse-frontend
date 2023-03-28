import { Link } from 'react-router-dom';
import BackgroundSm from '../../assets/images/vector-bg-2.png';
import Logo from '../../assets/images/washouse-tagline.png';
import RegisterContainer from '../../containers/AuthContainer/RegisterContainer';

type Props = {};

const RegisterPage = () => {
    return (
        <>
            <div className="login__form h-screen basis-2/5 flex items-center px-5 pr-48 text-sub relative">
                <div className="login__form--inner flex flex-col justify-center text-left pl-20 pr-32 -mt-[80px]">
                    <div className="site__logo w-1/3 min-w-[285px] -mb-3">
                        <Link to="/">
                            <img src={Logo} alt="" />
                        </Link>
                    </div>
                    <h1 className="font-bold text-4xl mt-6">Đăng ký</h1>
                    <h2 className="text-xl font-semibold mt-1">Hãy tham gia cùng chúng tôi!</h2>
                    <div className="login__form--input mt-3">
                        <RegisterContainer />
                    </div>
                </div>
                <div className="login__form--decoration right-0 bottom-0 absolute -z-10">
                    <img src={BackgroundSm} alt="" />
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
