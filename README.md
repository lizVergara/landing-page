# Landing Page por Liz Vergara

## Introducción

Este proyecto consiste en el desarrollo de una landing page que permite a los usuarios llenar sus datos de perfil. Al guardar, aparece una pantalla de carga hasta que los datos son almacenados, luego se muestra una pantalla con los datos del perfil del usuario junto con una galería de fotos cargadas. Se agregó un modal para poder ingresar el documendo de identidad del usuario y si ya estaba registrado podrá volver a visualizar su información.

### Tecnologías Utilizadas

- **Next.js**: Framework de React utilizado para el desarrollo del frontend y backend, aprovechando el Next App Router para crear las rutas y las APIs del proyecto.
- **React.**
- **Tailwind CSS**: Framework CSS para el diseño estilizado y responsivo.
- **TypeScript**: Superconjunto de JavaScript que añade tipado estático para mejorar la calidad del código.
- **Supabase**: Utilizado para la gestión de la base de datos y la autenticación.
- **AWS S3**: Almacenamiento de imágenes cargadas por los usuarios.
- **Open-Meteo API**: Para obtener la ubicación y temperatura actual basada en la ubicación del usuario.
- **Vercel**: Plataforma utilizada para el despliegue de la aplicación.
- **Redux-toolkit**: Manejo del estado de la aplicación de manera eficiente y escalable.

Se utilizó Next.js tanto para el frontend como para el backend.

### Instalación y Configuración

_Prerrequisitos_
Asegúrate de tener instalado Node.js (versión 18 o superior) Npm o Yarn en tu sistema para insatalar las dependencias.

Cuando se haya clonado el proyecto se deben instalar las dependencias:
npm install
o
yarn

**Variables de Entorno**
Antes de ejecutar la aplicación, asegúrate de configurar las siguientes variables de entorno en un archivo .env.local en la raíz del proyecto

### Ejecutar la Aplicación

Para iniciar la aplicación en modo desarrollo, ejecuta:

npm run dev
o
yarn dev

La aplicación estará disponible en http://localhost:3000.

### Descripción de Componentes

**API**

- **location**: API para hacer un middleware con Open-Meteo API para obtener latitud, longitud y temperatura.
- **profile**: API para manejar crear y subir las imagenes a aws s3.
- **user**: API para obtener todos los datos de los users que ya se han registrado.
- **weather**: API para obtener la temperatura actual de una ciudad usando Open-Meteo.

**Components**

- **dataContainer**: Contenedor de datos de los users.
- **form**: Formularios y modales para la entrada de datos.
- **ReduxProvider**: Proveedor de Redux.

**Features**

- **location**: Características relacionadas con los datos obtenidos con Open-Meteo API.
- **profile**: Características relacionadas con los datos del usuario, manejo de datos y llamadas API de creación de user y obtención de user.
- **weather**: Características relacionadas con la temperatura.

**Store**

- **hooks.tsx**: Hooks personalizados para el manejo del estado.
- **index.tsx**: Configuración de la tienda Redux, los slice y thunk aplicados se encuentran en la carpeta features/profile.

**User\[id]**
Pantalla para presentar los datos del usuario, si ha sido buscado mediante el ModalLogin se muestra la info, caso contrario redirige al form principal.

Autor
Nombre: Liz Vergara
Correo: lizvcast@espol.edu.ec
