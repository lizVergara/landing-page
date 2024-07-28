import React, { useState } from "react";
import { Location } from "../features/location/Location";
import loadingImage from "../../../public/images/loading.png";
import { setLocation } from "../features/profile/profileSlice";
import { useDispatch } from "react-redux";
import CloseIcon from "../../../public/icons/CloseIcon";
import LocationList from "./LocationList";

interface ModalWeatherProps {
  onClose: () => void;
}

const ModalWeather: React.FC<ModalWeatherProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [tempLocation, setTempLocation] = useState<Location | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = event.target.value.toLowerCase();

    if (queryValue.length > 1) {
      setLoading(true);
      try {
        const response = await fetch(`/api/location?query=${queryValue}`);
        const data: Location[] = await response.json();
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
              className="text-white-text bg-transparent hover:bg-gray-200 hover:text-modal-bg rounded-lg text-sm w-4 h-4 ms-auto focus:ring-0 focus:outline-none inline-flex justify-center items-center"
            >
              <CloseIcon />
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
              type="button"
              className=" mt-2 inline-flex items-center text-black bg-button-color hover:bg-yellow-600 focus:ring-0 focus:outline-none font-bold rounded-lg text-sm px-3 py-2.5 text-center"
              onClick={() => {
                if (tempLocation !== null) {
                  dispatch(setLocation(tempLocation));
                  onClose();
                }
              }}
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
              {results.length > 0 && !loading && (
                <LocationList results={results} onSelect={setTempLocation} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalWeather;
