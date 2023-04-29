import { DailyStatisticsResponse } from './DailyStatisticsResponse';
import { OrderOverviewResponse } from './OrderOverviewResponse';

export type CenterStatisticsResponse = {
    orderOverview: OrderOverviewResponse;
    dailystatistics: DailyStatisticsResponse[];
};
