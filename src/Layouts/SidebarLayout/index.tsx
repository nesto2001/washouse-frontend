import Footer from '../../components/Footer';
import Navbar from '../../components/Header';

type Props = {
    children?: JSX.Element;
};

const SidebarLayout = ({ children }: Props) => {
    return (
        <>
            <Navbar></Navbar>
            <div className="main mt-[107px] flex">
                <div className="main__listing w-full flex mb-20">{children}</div>
            </div>
            <Footer />
        </>
    );
};

export default SidebarLayout;
