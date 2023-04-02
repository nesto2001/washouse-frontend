import Footer from '../../components/Footer';
import Navbar from '../../components/Header';

type Props = {
    children?: JSX.Element;
};

const CenteredLayout = ({ children }: Props) => {
    return (
        <>
            <Navbar></Navbar>
            <div className="main mt-[107px] container mx-auto px-4 max-w-[1240px]">{children}</div>
            <Footer />
        </>
    );
};

export default CenteredLayout;
