import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  id: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  value,
  error,
  onChange,
}) => (
  <>
    <div className="custom-input-container">
      <label htmlFor={id} className="custom-label">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        className="custom-input"
        placeholder={label}
      />
    </div>

    {error && (
      <p className="text-button-color text-opacity-50 text-sm font-light mb-1 px-1">
        {error}
      </p>
    )}
  </>
);

export default InputField;
