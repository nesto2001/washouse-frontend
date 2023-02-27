import React from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import CenterContainer from '../../containers/CenterContainer';
import { CenterCardData } from '../../types/CenterCardData';

type Props = {};

const CenterPage = () => {
    return (
        <>
            <Breadcrumb />
            <CenterContainer/>
        </>
    );
};

export default CenterPage;
