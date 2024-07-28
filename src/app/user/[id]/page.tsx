"use client";
import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store/hooks";
import { selectProfile } from "@/app/features/profile/profileSlice";
import { InfoContainer } from "../../components/dataContainer";
import Carousel from "../../components/dataContainer/Carousel";

import Challenge from "@/app/components/main";
import mov from "../../../../public/images/mov.gif";
import Loading from "@/app/components/form/loading";

const User: NextPage = () => {
  const router = useRouter();
  const profile = useAppSelector(selectProfile);
  useEffect(() => {
    if (!profile.document) {
      router.push("/");
    }
  }, [profile, router]);

  return profile.document ? (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-10">
      <header className="w-full text-white-text flex flex-col items-center mb-6 px-20">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-2xl font-bold md:text-3xl">TRD</h1>
        </div>
        <div className="flex justify-between text-xl md:text-2xl items-center w-full max-w-6xl">
          <h2>
            Hola {profile.name} {profile.lastName}
          </h2>
          <div className="flex  items-center space-x-2">
            <h2>{profile.temperature ? profile.temperature : ""} °C</h2>
            <span>
              <img
                src={mov.src}
                style={{ height: "40px", width: "auto" }}
                alt="Clima"
              />
            </span>
          </div>
        </div>
      </header>

      <main className="flex flex-col md:flex-row w-full max-w-6xl justify-between">
        <section className="flex-1 bg-transparent flex justify-start items-start">
          <div className="w-full md:w-3/4 lg:w-full">
            <Carousel />
          </div>
        </section>

        <section className="flex-1 pt-20 md:ml-6">
          <div className="bg-form-bg p-6 rounded-lg mb-6">
            <h3 className="text-xl font-normal mb-4 text-secondary">
              Información personal
            </h3>
            <InfoContainer
              nombre={profile.name}
              apellido={profile.lastName}
              tipoDocumento={profile.documentType}
              numeroDocumento={profile.document}
              correoElectronico={profile.email}
              telefono={profile.phoneNumber}
            />
          </div>
          <div className="bg-form-bg p-6 rounded-lg mb-6">
            <h3 className="text-lg font-normal mb-4 text-secondary">
              Datos de facturación
            </h3>
            {profile.sameBillingInfo ? (
              <InfoContainer
                nombre={profile.name}
                apellido={profile.lastName}
                tipoDocumento={profile.documentType}
                numeroDocumento={profile.document}
                correoElectronico={profile.email}
                telefono={profile.phoneNumber}
              />
            ) : (
              //     <form
              //     className="w-full bg-form-bg p-5 rounded-lg shadow-lg"
              //   >
              //     <h2 className="text-xl text-secondary font-300 mb-4">
              //       Información personal
              //     </h2>
              //     <InputField
              //       label="Nombre"
              //       id="name"
              //       value={profile.name}
              //       onChange={(e) => dispatch(setName(e.target.value))}
              //     />
              //     <InputField
              //       label="Apellido"
              //       id="lastName"
              //       value={profile.lastName}
              //       onChange={(e) => dispatch(setLastName(e.target.value))}
              //     />
              //     <SelectField
              //       label="Tipo de documento"
              //       id="documentType"
              //       value={profile.documentType}
              //       options={["RUC", "cedula", "pasaporte"]}

              //       onChange={(e) => dispatch(setDocumentType(e.target.value))}
              //     />
              //     <InputField
              //       label="Número de documento"
              //       id="document"
              //       value={profile.document || ""}

              //       onChange={(e) => dispatch(setDocument(e.target.value))}
              //     />
              //     <InputField
              //       label="Correo electrónico"
              //       id="email"
              //       value={profile.email}
              //       onChange={(e) => dispatch(setEmail(e.target.value))}
              //     />
              //     <div className="flex flex-auto space-x-2">
              //       <div
              //         onClick={() => setIsModalOpen(true)}
              //         className="border-gray-300 p-2 md:p-3 rounded-lg shadow-lg hover:bg-gray-800 justify-center bg-input-bg flex items-center mt-7"
              //       >
              //         {location ? (
              //           <img src={location.image} className="h-10 w-10" />
              //         ) : (
              //           <LocationIcon />
              //         )}
              //       </div>
              //       <InputField
              //         label="Número de teléfono"
              //         id="phoneNumber"
              //         value={profile.phoneNumber}
              //         // error={errors.phoneNumber}
              //         onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
              //       />
              //     </div>
              //     </form>
              "Sin datos"
            )}
          </div>
        </section>
      </main>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <Challenge />
    </div>
  );
};

export default User;
