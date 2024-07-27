import { NextPage } from "next";
import { InfoContainer } from "../components/dataContainer";
import Carousel from "../components/dataContainer/Carousel";

const User: NextPage = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center p-4 md:p-10">
      <header className="w-full flex flex-col items-center mb-6 px-20">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-2xl md:text-3xl">TRD</h1>
        </div>
        <div className="flex justify-between items-center w-full max-w-6xl">
          <h2 className="text-xl md:text-2xl">Hola María Dolores</h2>
          <div className="flex items-center space-x-2">
            <span>24°</span>
            <span>🌤️</span>
          </div>
        </div>
      </header>

      <main className="flex flex-col md:flex-row w-full max-w-6xl justify-between">
        <section className="flex-1 bg-transparent flex justify-start items-start">
          <div className="w-full md:w-3/4 lg:w-full">
            <Carousel />
          </div>
        </section>

        <section className="flex-1 md:ml-6">
          <div className="bg-form-bg p-6 rounded-lg mb-6">
            <h3 className="text-lg font-normal mb-4 text-secondary">
              Información personal
            </h3>
            <InfoContainer
              nombre="liz"
              apellido="vergara"
              tipoDocumento="cedula"
              numeroDocumento="546454554"
              correoElectronico="ccc@nn.ds"
              telefono="06265165"
            />
          </div>
          <div className="bg-form-bg p-6 rounded-lg mb-6">
            <h3 className="text-lg font-normal mb-4 text-secondary">
              Datos de facturación
            </h3>
            <InfoContainer
              nombre="liz"
              apellido="vergara"
              tipoDocumento="cedula"
              numeroDocumento="546454554"
              correoElectronico="ccc@nn.ds"
              telefono="06265165"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default User;
