import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import CenterContainer from '../../containers/CenterContainer';
import CenterServiceContainer from '../../containers/CenterServiceContainer';
import { CenterCardData } from '../../types/CenterCardData';
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
