import { DailyStatisticsModel } from './DailyStatisticsModel';
import { OrderOverviewModel } from './OrderOverviewModel';

export type CenterStatisticsModel = {
    orderOverview: OrderOverviewModel;
    dailystatistics: DailyStatisticsModel[];
};
