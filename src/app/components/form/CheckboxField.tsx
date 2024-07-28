import { ChangeEvent } from "react";

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onChange,
}) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="form-checkbox h-6 w-6 accent-button-color transition duration-150 ease-in-out"
    />
    <label className="ml-2 text-white-text font-medium">{label}</label>
  </div>
);

export default CheckboxField;
