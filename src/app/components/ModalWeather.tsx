import React, { useState } from "react";
import { Location } from "../features/location/Location";
import loadingImage from "../../../public/images/loading.png";
interface ModalWeatherProps {
  onClose: () => void;
}

const ModalWeather: React.FC<ModalWeatherProps> = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = event.target.value.toLowerCase();
    setQuery(queryValue);
    if (queryValue.length > 1) {
      setLoading(true);
      try {
        const response = await fetch(`/api/location?query=${queryValue}`);
        const data: Location[] = await response.json();
        console.log(data);
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    } else {
      setResults([]);
    }
  };

  return (
    <div
      id="crud-modal"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center  pt-10 bg-gray-900 bg-opacity-50 overflow-auto"
    >
      <div className="relative p-4 w-full max-w-md max-h-full mb-20">
        <div className="relative bg-modal-bg rounded-lg shadow mb-20">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-white-text rounded-t-lg">
            <h3 className="text-lg font-semibold text-white-text">
              ¿De donde eres?
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-white-text bg-transparent hover:bg-gray-200 hover:text-modal-bg rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-normal text-white-text">
                Ingresa tu ciudad o País:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-white-text border border-secondary text-input-bg text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className=" mt-2 inline-flex items-center text-black bg-button-color hover:bg-yellow-600 focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-3 py-2.5 text-center"
            >
              Guardar ubicación
            </button>
          </form>
          {loading && (
            <div className="flex justify-center pb-2 mt-1">
              <img
                src={loadingImage.src}
                className="animate-spin h-12 w-12"
                alt="Loading"
              />
            </div>
          )}
          {results.length > 0 && !loading && (
            <div className="pt-1  pb-4 px-4 ">
              {results.map((location) => (
                <div
                  key={location.id}
                  className="border-2 rounded-md border-gray-300 my-2 p-2 hover:bg-gray-900 hover:bg-opacity-50 hover:border-0"
                >
                  <div className="flex pb-2 items-center">
                    <img
                      src={`https://hatscripts.github.io/circle-flags/flags/${location.country_code}.svg`}
                      className="h-8 w-8"
                    />
                    <p className="text-base ml-4 font-semibold text-light ">
                      {location.name}
                    </p>
                  </div>

                  <p className="text-sm  text-ellipsis text-white-text">
                    {location.admin1}, {location.country} ({location.latitude}°E{" "}
                    {location.longitude}°N
                    {location.elevation}m asl)
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalWeather;
