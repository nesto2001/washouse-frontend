import Breadcrumb from '../../components/Breadcrumb';
import CenterServiceContainer from '../../containers/CenterServiceContainer';
import { CenterData } from '../../types/CenterData';

type Props = {
    center: CenterData;
};

const CenterServicePage = () => {
    return (
        <>
            <Breadcrumb />
            <CenterServiceContainer />
        </>
    );
};

export default CenterServicePage;
