import React from 'react';
import { useState, useEffect } from 'react';
import CenterProfileManager from '../../../containers/ManagerContainer/CenterProfileManager/CenterProfileManagerContainer';

type Props = {};

const ManagerCenterPage = () => {
    return (
        <div className="bg-white w-2/3 mx-auto rounded border border-wh-lightgray">
            <CenterProfileManager />
        </div>
    );
};

export default ManagerCenterPage;
