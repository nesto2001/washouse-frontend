import Footer from '../../Footer';
import Navbar from '../../Header';
import Sidebar from '../../Sidebar';

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
