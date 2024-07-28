import React from "react";

const InfoRow: React.FC<InfoRowProps> = ({ label, value, flag }) => {
  return (
    <div className="flex-col justify-between items-center border border-input-bg p-2 rounded-lg">
      <h2 className="font-light text-secondary ">{label}</h2>
      <span className="flex text-white-text items-center space-x-2">
        <p>{value}</p>
      </span>
    </div>
  );
};

export const InfoContainer: React.FC<InfoContainerProps> = ({
  nombre,
  apellido,
  tipoDocumento,
  numeroDocumento,
  correoElectronico,
  telefono,
}) => {
  return (
    <div className="space-y-4">
      <InfoRow label="Nombre" value={nombre} />
      <InfoRow label="Apellido" value={apellido} />
      <InfoRow label="Tipo de documento" value={tipoDocumento} />
      <InfoRow label="Número de documento" value={numeroDocumento} />
      <InfoRow label="Correo electrónico" value={correoElectronico} />
      <div className="flex flex-auto space-x-2">
        <div className=" border-gray-300 p-2 md:p-3 rounded-lg shadow-lg hover:bg-gray-800 justify-center bg-input-bg flex items-center">
          <img
            src="https://open-meteo.com/images/country-flags/ec.svg"
            className="h-10 w-10"
            alt="Flag"
          />
        </div>
        <div className="flex-col w-full justify-between items-center border border-input-bg p-2 rounded-lg">
          <h2 className="font-light text-secondary ">Número de teléfono</h2>
          <span className="flex items-center space-x-2">
            <p>{telefono}</p>
          </span>
        </div>
      </div>
    </div>
  );
};
