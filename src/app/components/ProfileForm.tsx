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
  // setImages,
  selectLocation,
  selectProfile,
} from "../features/profile/profileSlice";
import InboxImage from "../../../public/icons/inboxSvg";
import { ChangeEvent, useRef, useState } from "react";
import ModalWeather from "./ModalWeather";
import { useAppSelector } from "../store/hooks";
import LocationIcon from "../../../public/icons/locationSvg";
import { createProfile } from "@/services/addUserService";

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  const profile = useAppSelector(selectProfile);
  const location = useAppSelector(selectLocation);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [images, setLocalImages] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const newImages = Array.from([file]);
    // const newImages = Array.from(e.target.files);
    if (images.length + newImages.length > 4) return;

    setLocalImages([...images, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setLocalImages(updatedImages);
    // dispatch(setImages(updatedImages));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(profile);
    console.log(images);
    const formData = new FormData();

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append(`image`, image);
      });
    }
    // try {
    //   const result = await createProfile(profile);
    //   console.log(result);
    // } catch (error) {
    //   console.error(error);
    // }
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
                  id="name"
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
                  className="custom-input mt-1 block w-full rounded-md text-secondary border-gray-300 shadow-sm focus:border-none focus:ring-none"
                >
                  <option value="RUC">RUC</option>
                  <option value="cedula">Cédula</option>
                  <option value="pasaporte">Pasaporte</option>
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
                  id="email"
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
                </div>

                <div
                  className="custom-input-container flex-grow"
                  onClick={() => document.getElementById("telefono")?.focus()}
                >
                  <label className="custom-label">Número de teléfono</label>
                  <input
                    id="phone"
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
                <div
                  className="relative bg-input-bg p-4 rounded-lg mt-2 grid grid-cols-10 gap-4 cursor-pointer"
                  onChange={handleFileChange}
                >
                  <input
                    id="image"
                    type="file"
                    ref={inputRef}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    multiple
                    accept="image/*"
                  />
                  <div className="col-span-1 flex items-center justify-center">
                    <InboxImage />
                  </div>
                  <div className="col-span-8">
                    <h3 className="font-normal text-white-text text-sm md:text-base lg:text-lg xl:text-xl">
                      Haz clic o arrastra los archivos a esta área para
                      cargarlos
                    </h3>
                    <label className="text-gray-500  block w-full focus:outline-none  text-lg ">
                      JPG, PNG, Tiff, hasta 2 mb
                    </label>
                  </div>
                </div>
                {images.length >= 4 && (
                  <p className="text-red-600 text-sm font-light">
                    Ya tiene 4 imágenes
                  </p>
                )}
                {images.length > 0 && (
                  <div className="mt-4 ">
                    <h3 className="text-secondary font-normal mb-3">
                      Imágenes cargadas
                    </h3>
                    <div className="rounded-lg p-px bg-gradient-to-r  from-cyan-400 via-pink-500 via-purple-500 to-orange-500">
                      <div className="bg-form-bg rounded-lg p-4">
                        {images.map((image, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center mb-2"
                          >
                            <span className="text-white font-semibold text-xs">
                              {image.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="text-red-600 text-xs"
                            >
                              🗑️
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
      {isModalOpen && <ModalWeather onClose={handleCloseModal} />}
    </>
  );
};

export default ProfileForm;
