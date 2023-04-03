import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CenterList from '../../../components/CenterList/CenterList';
import { CenterModel } from '../../../models/Center/CenterModel';
import { getCenterRequests } from '../../../repositories/RequestRepository';

type Props = {};

const AdminCenterRequestsContainer = (props: Props) => {
    const location = useLocation();
    const [centerRequests, setCenterRequests] = useState<CenterModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            return await getCenterRequests({});
        };
        fetchData().then((res) => {
            setCenterRequests(res);
        });
    }, []);

    return (
        <div>
            <CenterList centerRequests={centerRequests} />
        </div>
    );
};

export default AdminCenterRequestsContainer;
