import { ChangeEvent } from "react";

interface SelectFieldProps {
  label: string;
  id: string;
  value: string;
  options: string[];
  error?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  value,
  options,
  error,
  onChange,
}) => (
  <div className="custom-input-container">
    <label htmlFor={id} className="custom-label">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="custom-input mt-1 block w-full rounded-md text-secondary border-gray-300 shadow-sm focus:border-none focus:ring-none"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && (
      <p className="text-button-color text-opacity-50 text-sm font-light mb-1 px-1">
        {error}
      </p>
    )}
  </div>
);

export default SelectField;
