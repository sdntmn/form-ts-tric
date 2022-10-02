interface IInputProps {
  name: string;
  type: string;
  value: string;
  isData: boolean;
  textError: string;
  className: string;
  placeholder?: string;
  autoComplete?: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  name,
  type,
  value,
  isData,
  textError,
  className,
  placeholder,
  autoComplete,
  onBlur,
  onChange,
}: IInputProps): JSX.Element {
  return (
    <div className="form__wrap">
      <label className="form__label form__label-extend">{placeholder}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={className}
        onBlur={onBlur}
        autoComplete={autoComplete}
      />
      <span className="form__input-error"> {isData && textError}</span>
    </div>
  );
}

export default Input;
