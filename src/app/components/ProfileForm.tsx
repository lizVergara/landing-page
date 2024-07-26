"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import {
  setName,
  setLastName,
  setDocumentType,
  setDocument,
  setEmail,
  setPhoneNumber,
  setSameBillingInfo,
  selectLocation,
  selectProfile,
} from "../features/profile/profileSlice";
import InboxImage from "../../../public/icons/inboxSvg";
import directInbox from "../../../public/images/direct-inbox.png";
import { useState } from "react";
import ModalWeather from "./ModalWeather";
import { useAppSelector } from "../store/hooks";
import LocationIcon from "../../../public/icons/locationSvg";

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useAppSelector(selectProfile);
  const location = useAppSelector(selectLocation);

  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(profile);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4 sm:w-1/2 w-full">
        <div className="w-full p-6 rounded-lg shadow-lg mx-auto">
          <h1 className="text-3xl text-center mb-6 font-semibold text-white">
            TRD
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full bg-form-bg p-5 rounded-lg shadow-lg space-y-6"
          >
            <h2 className="text-xl text-secondary font-300 mb-4">
              Información personal
            </h2>
            <div className="space-y-6">
              <div
                className="custom-input-container"
                onClick={() => document.getElementById("nombre")?.focus()}
              >
                <label className="custom-label">Nombre</label>
                <input
                  id="nombre"
                  type="text"
                  value={profile.name}
                  onChange={(e) => dispatch(setName(e.target.value))}
                  className="custom-input"
                  placeholder="Nombre"
                />
              </div>
              <div
                className="custom-input-container"
                onClick={() => document.getElementById("apellido")?.focus()}
              >
                <label className="custom-label">Apellido</label>
                <input
                  id="apellido"
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => dispatch(setLastName(e.target.value))}
                  className="custom-input"
                  placeholder="Apellido"
                />
              </div>
              <div
                className="custom-input-container"
                onClick={() =>
                  document.getElementById("tipo-documento")?.focus()
                }
              >
                <label className="custom-label">Tipo de documento</label>
                <select
                  id="tipo-documento"
                  value={profile.documentType}
                  onChange={(e) => dispatch(setDocumentType(e.target.value))}
                  className="custom-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-none focus:ring-none"
                >
                  <option value="RUC">RUC</option>
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
              </div>
              <div
                className="custom-input-container"
                onClick={() =>
                  document.getElementById("numero-documento")?.focus()
                }
              >
                <label className="custom-label">Número de documento</label>
                <input
                  id="numero-documento"
                  type="text"
                  value={profile.document ?? ""}
                  onChange={(e) => dispatch(setDocument(e.target.value))}
                  className="custom-input shadow-sm focus:border-none focus:ring-none"
                  placeholder="Número de documento"
                />
              </div>
              <div
                className="custom-input-container"
                onClick={() => document.getElementById("correo")?.focus()}
              >
                <label className="custom-label">Correo electrónico</label>
                <input
                  id="correo"
                  type="email"
                  value={profile.email}
                  onChange={(e) => dispatch(setEmail(e.target.value))}
                  className="custom-input shadow-sm focus:border-none focus:ring-none"
                  placeholder="Correo electrónico"
                />
              </div>
              <div className="flex flex-auto space-x-2">
                <div
                  onClick={handleOpenModal}
                  className=" border-gray-300 p-2 md:p-3 rounded-lg shadow-lg hover:bg-gray-800 justify-center bg-input-bg flex items-center"
                >
                  {location ? (
                    <img src={location.image} className="h-10 w-10" />
                  ) : (
                    <LocationIcon />
                  )}
                  {/* <LocationIcon /> */}
                </div>

                <div
                  className="custom-input-container flex-grow"
                  onClick={() => document.getElementById("telefono")?.focus()}
                >
                  <label className="custom-label">Número de teléfono</label>
                  <input
                    id="telefono"
                    type="tel"
                    value={profile.phoneNumber}
                    onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
                    className="custom-input shadow-sm focus:border-none focus:ring-none"
                    placeholder="Número de teléfono"
                  />
                </div>
              </div>

              <div className="w-full px-1">
                <h2 className="text-secondary font-normal">
                  Carga hasta 4 imágenes para tu perfil
                </h2>
                <div className="bg-input-bg p-4 rounded-lg mt-2 grid grid-cols-10 gap-4">
                  <div className="col-span-1 flex items-center justify-center">
                    <InboxImage />
                  </div>
                  <div className="col-span-8">
                    <h3 className="font-normal text-white-text text-sm md:text-base lg:text-lg xl:text-xl">
                      Haz clic o arrastra los archivos a esta área para
                      cargarlos
                    </h3>
                    <p className="font-light text-white-text text-xs md:text-sm lg:text-base xl:text-lg">
                      JPG, PNG, Tiff, hasta 2 mb
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={profile.sameBillingInfo}
                  onChange={(e) =>
                    dispatch(setSameBillingInfo(e.target.checked))
                  }
                  className="form-checkbox h-4 w-4 accent-button-color transition duration-150 ease-in-out"
                />
                <label className="ml-2 text-white-text font-medium">
                  Usar los mismos datos para la facturación
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full inline-flex justify-center py-4 px-4 border border-transparent shadow-sm text-sm font-bold rounded-md text-black bg-button-color hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={handleSubmit}
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <ModalWeather onClose={handleCloseModal} /> // Pasar la función para cerrar el modal
      )}
    </>
  );
};

export default ProfileForm;
