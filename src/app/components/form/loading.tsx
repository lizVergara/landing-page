import loadingImage from "../../../../public/images/loading.png";
import colorsImage from "../../../../public/images/Colors.png";
const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src={colorsImage.src}
        alt="Colors Background"
        className="absolute top-0 left-0 w-full h-auto"
        style={{ maxHeight: "40%" }}
      />
      <img
        src={loadingImage.src}
        className="animate-spin h-12 w-12"
        alt="Loading"
      />
      <p style={{ marginTop: "10px" }}>Estamos validando tus</p>
      <p>datos</p>
    </div>
  );
};
export default Loading;
