import { Link, useNavigate } from 'react-router-dom';
import BackgroundSm from '../../assets/images/vector-bg-2.png';
import Logo from '../../assets/images/washouse-tagline.png';
import LoginContainer from '../../containers/AuthContainer/LoginContainer';
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import { getMe, loginGoogle } from '../../repositories/AuthRepository';

type Props = {};

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    const handleGoogleAuthRedirect = async () => {
        const searchParams = new URLSearchParams(window.location.search);
        const authCode = searchParams.get('code');
        const redirectUri = `${window.location.origin}/login`;

        if (!authCode) {
            console.error('No authorization code found in URL');
            return;
        }

        loginGoogle({ code: authCode, redirectUri: redirectUri }).then((res) => {
            if (res.status === 200 && res.data.message.toLowerCase().includes('success')) {
                localStorage.setItem('accessToken', res.data.data.accessToken);
                localStorage.setItem('refreshToken', res.data.data.refreshToken);
                const fetchData = async () => {
                    return await getMe();
                };
                fetchData().then((res) => {
                    localStorage.setItem('currentUser', JSON.stringify(res));
                    if (res.roleType.toLowerCase() === 'admin') {
                        navigate('/admin/dashboard');
                    } else {
                        navigate('/trung-tam');
                    }
                });
            }
        });
    };

    useEffect(() => {
        if (!window.location.search.includes('code=')) {
            setLoading(false);
        } else {
            handleGoogleAuthRedirect();
        }
    }, []);

    if (loading) {
        return <Loading screen />;
    }

    return (
        <>
            <div className="login__form h-screen basis-2/5 flex items-center px-5 pr-48 text-sub relative">
                <div className="login__form--inner flex flex-col justify-center text-left pl-20 pr-32 -mt-[80px]">
                    <div className="site__logo w-1/3 min-w-[285px] -mb-3">
                        <Link to="/">
                            <img src={Logo} alt="" />
                        </Link>
                    </div>
                    <h1 className="font-bold text-4xl mt-6">Đăng nhập</h1>
                    <h2 className="text-xl font-semibold mt-1">Chào mừng bạn đã quay trở lại!</h2>
                    <div className="login__form--input mt-3">
                        <form>
                            <LoginContainer setLoading={setLoading} />
                        </form>
                    </div>
                </div>
                <div className="login__form--decoration right-0 bottom-0 absolute -z-10">
                    <img src={BackgroundSm} alt="" />
                </div>
            </div>
        </>
    );
};

export default LoginPage;
