import CenterCard from '../../../components/CenterCard';
import { CenterModel } from '../../../models/Center/CenterModel';

type CenterListingProps = {
    centerList: CenterModel[];
    selectedValues?: string[];
};

const CenterListing = ({ centerList, selectedValues }: CenterListingProps) => {
    return (
        <div className="flex flex-wrap gap-9">
            {centerList.map((center) => {
                return <CenterCard key={center.id} center={center} selectedValues={selectedValues}></CenterCard>;
            })}
        </div>
    );
};

export default CenterListing;
