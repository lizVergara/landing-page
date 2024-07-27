import React, { useState } from "react";
import { Location } from "../features/location/Location";

interface LocationListProps {
  results: Location[];
  onSelect: (location: Location) => void;
}

const LocationList: React.FC<LocationListProps> = ({ results, onSelect }) => {
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null
  );

  const handleSelect = (location: Location) => {
    setSelectedLocationId(location.id);
    onSelect(location);
  };

  return (
    <div className="pt-1 pb-4">
      {results.map((location) => (
        <div
          key={location.id}
          className={`border rounded-md border-gray-300 my-3 px-4 p-2 ${
            selectedLocationId === location.id
              ? "bg-form-bg bg-opacity-50  border-0 shadow-lg "
              : ""
          } hover:bg-gray-800 hover:bg-opacity-50 hover:border-0`}
          onClick={() => handleSelect(location)}
        >
          <div className="flex pb-2 items-center">
            <img src={location.image} className="h-8 w-8" alt={location.name} />
            <p className="text-base ml-4 font-semibold text-light">
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
};

export default LocationList;
