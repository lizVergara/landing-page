import Image from "next/image";
import { InfoContainer } from "../components/dataContainer";

const User: React.FC = () => {
  return (
    <div className=" text-white min-h-screen flex flex-col items-center p-4 md:p-10">
      <header className="w-full flex flex-col mb-6  px-20">
        <div className="mb-4 items-center justify-center">
          <h1 className="text-2xl md:text-3xl ">TRD</h1>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl md:text-2xl">Hola María Dolores</h2>
          <div className="flex items-center space-x-2">
            <span>24°</span>
            <span>🌤️</span>
          </div>
        </div>
      </header>

      <main className="flex flex-col md:flex-row w-full max-w-6xl justify-between">
        <section className="flex-1">
          <div className="bg-gray-800 p-4 rounded-lg mb-6">
            <Image
              src="/path-to-your-image.png"
              alt="User Image"
              width={500}
              height={500}
              className="rounded-lg"
            />
            <div className="flex justify-center space-x-2 mt-4">
              <button className="w-2 h-2 bg-white rounded-full"></button>
              <button className="w-2 h-2 bg-gray-500 rounded-full"></button>
              <button className="w-2 h-2 bg-gray-500 rounded-full"></button>
              <button className="w-2 h-2 bg-gray-500 rounded-full"></button>
            </div>
          </div>
        </section>
        <section className="flex-1 md:ml-6">
          <div className="bg-form-bg p-6 rounded-lg mb-6">
            <h3 className="text-lg font-normal mb-4 text-secondary ">
              Información personal
            </h3>
            {/* <PersonalInfo /> */}
            <InfoContainer
              nombre={"liz"}
              apellido={"vergara"}
              tipoDocumento={"cedula"}
              numeroDocumento={"546454554"}
              correoElectronico={"ccc@nn.ds"}
              telefono={"06265165"}
            />
          </div>
          <div className="bg-form-bg p-6 rounded-lg mb-6">
            <h3 className="text-lg font-normal mb-4 text-secondary ">
              Datos de facturación
            </h3>
            <InfoContainer
              nombre={"liz"}
              apellido={"vergara"}
              tipoDocumento={"cedula"}
              numeroDocumento={"546454554"}
              correoElectronico={"ccc@nn.ds"}
              telefono={"06265165"}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default User;
