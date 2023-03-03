import Footer from '../../Footer';
import Navbar from '../../Header';
import Sidebar from '../../Sidebar';

type Props = {
    children?: JSX.Element;
};

const BlankCenteredLayout = ({ children }: Props) => {
    return (
        <>
            <div className="main container mx-auto px-4 max-w-[1240px]">{children}</div>
        </>
    );
};

export default BlankCenteredLayout;
