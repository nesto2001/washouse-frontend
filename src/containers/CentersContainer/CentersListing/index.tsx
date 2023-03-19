import CenterCard from '../../../components/CenterCard';
import { CenterModel } from '../../../models/Center/CenterModel';

type CenterListingProps = {
    centerList: CenterModel[];
};

const CenterListing = ({ centerList }: CenterListingProps) => {
    return (
        <div className="flex flex-wrap gap-9">
            {centerList.map((center) => {
                return <CenterCard key={center.id} center={center}></CenterCard>;
            })}
        </div>
    );
};

export default CenterListing;
