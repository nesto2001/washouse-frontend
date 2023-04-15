import * as React from 'react';
import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import { getCenter } from '../../../repositories/CenterRepository';

type Props = {};

const AdminCenterDetailsContainer = (props: Props) => {
    let { state } = useLocation();
    const [centerDetails, setCenterDetails] = useState()

    const id = parseInt(state.id ?? 0);

    useEffect(() => {
      if (id && id !==0){
        getCenter(id).then() 
      }
    }, [])
    

    return <div>{state.id}</div>;
};

export default AdminCenterDetailsContainer;
