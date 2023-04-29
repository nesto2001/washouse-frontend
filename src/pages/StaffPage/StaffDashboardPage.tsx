import { Card, Space } from 'antd';
import React from 'react';
import { BsClipboard2DataFill } from 'react-icons/bs';
import { FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '../../utils/FormatUtils';
import StaffDashboardContainer from '../../containers/StaffContainer/StaffDashboardContainer/StaffDashboardContainer';

type Props = {};

const StaffDashboardPage = () => {
    return <StaffDashboardContainer />;
};

export default StaffDashboardPage;
