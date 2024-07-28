import { ChangeEvent, useRef } from "react";
import InboxImage from "../../../../public/icons/inboxSvg";

interface FileUploadProps {
  images: File[];
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (index: number) => void;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  images,
  handleFileChange,
  handleRemoveImage,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div
        className="relative bg-input-bg p-4 rounded-lg mt-2  mb-5 grid grid-cols-10 gap-4 cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        <input
          type="file"
          ref={inputRef}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <div className="col-span-1 flex items-center justify-center">
          <InboxImage />
        </div>
        <div className="col-span-8">
          <h3 className="font-semibold text-white-text text-xs md:text-sm lg:text-normal xl:text-lg">
            Haz clic o arrastra los archivos a esta área para cargarlos
          </h3>
          <label className="text-gray-500 block w-full focus:outline-none text-lg">
            JPG, PNG, Tiff, hasta 2 mb
          </label>
        </div>
        {images.length > 0 && (
          <div className="mt-6">
            <h3 className="text-secondary font-normal mb-3">
              Imágenes cargadas
            </h3>
            <div className="rounded-lg p-px bg-gradient-to-r from-cyan-400 via-pink-500 via-purple-500 to-orange-500">
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
                      className="text-button-color text-xs"
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

      {error && (
        <p className="text-button-color text-opacity-50 text-sm font-light mb-6 px-1">
          {error}
        </p>
      )}
    </>
  );
};

export default FileUpload;
