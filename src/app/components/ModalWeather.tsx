// src/app/components/ModalWeather.tsx
import React, { useState } from "react";
import { Location } from "../features/location/Location";

interface ModalWeatherProps {
  onClose: () => void;
}

const ModalWeather: React.FC<ModalWeatherProps> = ({ onClose }) => {
  const [results, setResults] = useState<Location[]>([]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = event.target.value.toLowerCase();
    console.log(queryValue);

    if (queryValue) {
      try {
        const response = await fetch(`/api/location?query=${queryValue}`);
        const data: Location[] = await response.json();
        setResults(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div
      id="crud-modal"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-400 dark:border-gray-600 rounded-t-lg">
            <h3 className="text-lg font-semibold text-form-bg dark:text-white">
              ¿De donde eres?
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
              <label className="block mb-2 text-sm font-medium text-form-bg dark:text-white">
                Ingresa tu ciudad o País:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder="Type product name"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center text-black bg-button-color hover:bg-yellow-600 focus:ring-4 focus:outline-none font-bold rounded-lg text-sm px-3 py-2.5 text-center"
            >
              Guardar ubicación
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalWeather;
