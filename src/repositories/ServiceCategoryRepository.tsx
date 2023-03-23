import { List } from 'reselect/es/types';
import { DistrictReponse } from '../models/DistrictReponse';
import instance from '../services/axios/AxiosInstance';
import { LocationModel } from '../models/LocationModel';

// export const getDistricts = async (): Promise<DistrictType[]> => {
//     const { data } = await instance.get<List<DistrictReponse>>('/api/district/getAll', {});
//     return data.map((item): DistrictType => {
//         return {
//             id: item.districtId,
//             name: item.districtName,
//         };
//     });
// };
