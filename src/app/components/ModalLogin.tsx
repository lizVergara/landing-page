import React, { useEffect, useState } from "react";
import CloseIcon from "../../../public/icons/CloseIcon";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { fetchUserProfile } from "../features/profile/profileThunks";
import { useRouter } from "next/navigation";
import { selectLoading, selectProfile } from "../features/profile/profileSlice";

interface ModalLoginProps {
  onClose: () => void;
  setIsRedirecting: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalLogin: React.FC<ModalLoginProps> = ({
  onClose,
  setIsRedirecting,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [documentoId, setDocumentoId] = useState("");
  const [error, setError] = useState("");
  const profile = useAppSelector(selectProfile);
  const isLoading = useAppSelector(selectLoading);

  useEffect(() => {
    if (profile.name) {
      router.push(`/user/${profile.name}`);
    }
  }, [profile, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (documentoId == "") {
      setError("Por favor ingresar un número de documento");
      return;
    }
    try {
      const resultAction = await dispatch(fetchUserProfile(documentoId));

      if (fetchUserProfile.fulfilled.match(resultAction)) {
        setIsRedirecting(false);
      } else {
        setError("No se encontró información con ese número de documento");
      }
    } catch (error) {
      console.error(error);
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
              ¿Quieres revisar tu información?
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-white-text bg-transparent hover:bg-gray-200 hover:text-modal-bg rounded-lg text-sm w-4 h-4 ms-auto inline-flex justify-center items-center"
            >
              <CloseIcon />
            </button>
          </div>
          <form className="p-4 md:p-5">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-normal text-white-text">
                Ingresa tu número de documento:
              </label>
              <input
                type="text"
                name="documento"
                id="documento"
                value={documentoId}
                className="bg-white-text border border-secondary text-input-bg text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onChange={(e) => {
                  if (/^[0-9]*$/.test(e.target.value)) {
                    setDocumentoId(e.target.value);
                  }
                }}
              />
            </div>
            {error != "" && (
              <p className="text-button-color text-opacity-50 text-sm font-light mb-1 px-1">
                {error}
              </p>
            )}
            <button
              type="button"
              className=" mt-2 inline-flex items-center text-black bg-button-color hover:bg-yellow-600 focus:ring-0 focus:outline-none font-bold rounded-lg text-sm px-3 py-2.5 text-center"
              onClick={handleSubmit}
            >
              Encontrar información
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
