import { Card, Space } from 'antd';
import { BsClipboard2DataFill, BsFileEarmarkPost } from 'react-icons/bs';
import { FaMoneyBillWave, FaStore, FaUserFriends } from 'react-icons/fa';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../../utils/FormatUtils';
import { Link } from 'react-router-dom';
import AdminDashboardContainer from '../../containers/AdminDashboardContainer/AdminDashboardContainer';

type Props = {};
const data = [
    {
        date: '15/04/2023',
        failed: 200,
        success: 2400,
        amt: 2400,
    },
    {
        date: '16/04/2023',
        failed: 300,
        success: 1398,
    },
    {
        date: '17/04/2023',
        failed: 200,
        success: 9800,
    },
    {
        date: '18/04/2023',
        failed: 200,
        success: 3908,
    },
    {
        date: '19/04/2023',
        failed: 200,
        success: 4800,
    },
    {
        date: '20/04/2023',
        failed: 200,
        success: 3800,
    },
    {
        date: '21/04/2023',
        failed: 200,
        success: 4300,
    },
];
const AdminDashboardPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <AdminDashboardContainer />
        </div>
    );
};

export default AdminDashboardPage;
