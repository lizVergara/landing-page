interface InfoContainerProps {
  nombre: string;
  apellido: string;
  tipoDocumento: string;
  numeroDocumento: string;
  correoElectronico: string;
  telefono: string;
}

interface InfoRowProps {
  label: string;
  value: string;
  flag?: boolean;
}
