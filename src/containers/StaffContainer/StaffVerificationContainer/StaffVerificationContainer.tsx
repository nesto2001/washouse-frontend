import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { verifyStaff } from '../../../repositories/StaffRepository';
import { getMe } from '../../../repositories/AuthRepository';

type Props = {};

const StaffVerificationContainer = (props: Props) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    useEffect(() => {
        if (code) {
            verifyStaff(code).then((res) => console.log(res));
        }
    }, [code]);

    return (
        <div className="h-screen relative">
            <div className="absolute top-0 left-0 bottom-0 right-0 h-96 my-auto"></div>
        </div>
    );
};

export default StaffVerificationContainer;
