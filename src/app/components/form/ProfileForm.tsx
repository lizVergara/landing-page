"use client";
import { useAppDispatch } from "../../../app/store/hooks";

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
  selectLoading,
} from "../../features/profile/profileSlice";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ModalWeather from "../ModalWeather";
import { useAppSelector } from "../../store/hooks";
import LocationIcon from "../../../../public/icons/locationSvg";
import CheckboxField from "./CheckboxField";
import FileUpload from "./FileUpload";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { createProfileThunk } from "@/app/features/profile/profileThunks";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import ModalLogin from "../ModalLogin";

const ProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const profile = useAppSelector(selectProfile);
  const location = useAppSelector(selectLocation);
  const isLoading = useAppSelector(selectLoading);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [images, setImages] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      if (images.length + fileArray.length > 4) return;
      setImages([...images, ...fileArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!profile.name) newErrors.name = "Nombre es requerido.";
    if (!profile.lastName) newErrors.lastName = "Apellido es requerido.";
    if (!profile.documentType)
      newErrors.documentType = "Tipo de documento es requerido.";
    if (!profile.document)
      newErrors.document = "Número de documento es requerido.";
    if (!profile.email) newErrors.email = "Correo electrónico es requerido.";
    if (!profile.phoneNumber)
      newErrors.phoneNumber = "Número de teléfono es requerido.";
    if (!location) newErrors.location = "Ubicación es requerida.";
    if (images.length <= 0)
      newErrors.images = "Se requieren al menos una imagen.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setShowLoading(true);
    setTimeout(async () => {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        if (key === "location") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      });
      images.forEach((image, index) => {
        formData.append(`files`, image);
      });

      const resultAction = await dispatch(createProfileThunk(formData));
      if (createProfileThunk.fulfilled.match(resultAction)) {
        setIsRedirecting(true);
        router.push(`/user/${profile.name}`);
      }
    }, 2000);
  };

  if (isLoading || isRedirecting) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4 sm:w-1/2 w-full">
        <div className="w-full p-6 rounded-lg shadow-lg mx-auto">
          <h1 className="text-3xl text-center mb-6 font-semibold text-white">
            TRD
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-full bg-form-bg p-5 rounded-lg shadow-lg"
          >
            <h2 className="text-xl text-secondary font-300 mb-4">
              Información personal
            </h2>
            <InputField
              label="Nombre"
              id="name"
              value={profile.name}
              error={errors.name}
              onChange={(e) => {
                if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                  dispatch(setName(e.target.value));
                }
              }}
            />
            <InputField
              label="Apellido"
              id="lastName"
              value={profile.lastName}
              error={errors.lastName}
              onChange={(e) => {
                if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
                  dispatch(setLastName(e.target.value));
                }
              }}
            />
            <SelectField
              label="Tipo de documento"
              id="documentType"
              value={profile.documentType}
              options={["RUC", "cedula", "pasaporte"]}
              error={errors.documentType}
              onChange={(e) => dispatch(setDocumentType(e.target.value))}
            />
            <InputField
              label="Número de documento"
              id="document"
              value={profile.document || ""}
              error={errors.document}
              onChange={(e) => {
                if (/^[0-9]*$/.test(e.target.value)) {
                  dispatch(setDocument(e.target.value));
                }
              }}
            />
            <InputField
              label="Correo electrónico"
              id="email"
              value={profile.email}
              error={errors.email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
            <div className="flex flex-auto space-x-2">
              <div
                onClick={() => setIsModalOpen(true)}
                className="border-gray-300 p-2 md:p-3 rounded-lg shadow-lg hover:bg-gray-800 justify-center bg-input-bg flex items-center mt-7"
              >
                {location ? (
                  <img src={location.image} className="h-10 w-10" />
                ) : (
                  <LocationIcon />
                )}
              </div>
              <InputField
                label="Número de teléfono"
                id="phoneNumber"
                value={profile.phoneNumber}
                onChange={(e) => {
                  if (/^\+?[0-9]*$/.test(e.target.value)) {
                    dispatch(setPhoneNumber(e.target.value));
                  }
                }}
              />
            </div>
            <div className="flex flex-auto space-x-2 justify-between">
              {errors.location && (
                <div className="  flex items-center">
                  <p className="text-button-color text-opacity-50 text-sm font-light mb-1 px-1 ">
                    {errors.location}
                  </p>
                </div>
              )}

              {errors.phoneNumber && (
                <div className="flex-grow">
                  <p className="text-button-color text-opacity-50 text-sm font-light mb-1 px-1 ">
                    {errors.phoneNumber}
                  </p>
                </div>
              )}
            </div>
            <div className="w-full px-1 mt-6">
              <h2 className="text-secondary text-xl pb-1 font-normal">
                Carga hasta 4 imágenes para tu perfil
              </h2>
              <FileUpload
                images={images}
                handleFileChange={handleFileChange}
                handleRemoveImage={handleRemoveImage}
                error={errors.images}
                isLoginModalOpen={isLoginModalOpen}
                isLoading={showLoading}
                isRedirecting={isRedirecting}
              />
            </div>
          </form>
          <div className="bg-form-bg p-4 my-7 rounded-lg shadow-lg">
            <h2 className="text-secondary text-xl pb-4 font-normal">
              Datos de facturación
            </h2>
            <CheckboxField
              label="Usar los mismos datos para la facturación"
              checked={profile.sameBillingInfo}
              onChange={(e) => dispatch(setSameBillingInfo(e.target.checked))}
            />
            <button
              type="submit"
              className="mt-6 w-full inline-flex justify-center py-4 px-4 border-0 border-transparent shadow-sm text-sm font-bold rounded-md text-black bg-button-color hover:bg-yellow-600 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={handleSubmit}
            >
              Enviar
            </button>

            <p
              className="mt-4 text-center text-white underline cursor-pointer"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Ya tienes cuenta, ingresa para ver tu información
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && <ModalWeather onClose={() => setIsModalOpen(false)} />}
      {isLoginModalOpen && (
        <ModalLogin
          setIsRedirecting={setIsRedirecting}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProfileForm;
