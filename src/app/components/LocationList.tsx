import React from "react";
import { Location } from "../features/location/Location";

interface LocationListProps {
  results: Location[];
  onSelect: (location: Location) => void;
}

const LocationList: React.FC<LocationListProps> = ({ results, onSelect }) => (
  <div className="pt-1 pb-4 px-4">
    {results.map((location) => (
      <div
        key={location.id}
        className="border-2 rounded-md border-gray-300 my-2 p-2 hover:bg-gray-800 hover:bg-opacity-50 hover:border-0"
        onClick={() => onSelect(location)}
      >
        <div className="flex pb-2 items-center">
          <img src={location.image} className="h-8 w-8" alt={location.name} />
          <p className="text-base ml-4 font-semibold text-light ">
            {location.name}
          </p>
        </div>
        <p className="text-sm text-ellipsis text-white-text">
          {location.admin1}, {location.country} (` {location.latitude} ` °E{" "}
          {location.longitude} °N ` {location.elevation} ` m asl)
        </p>
      </div>
    ))}
  </div>
);

export default LocationList;
