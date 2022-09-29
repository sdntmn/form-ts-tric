interface InputProps {
  name: string;
  type: string;
  value: string;

  className: string;
  placeholder?: string;

  isData: boolean;
  onBlur: () => void;
  onChange: () => void;
}

function InputPopup({
  name,
  type,
  value,
  isData,
  className,
  placeholder,
  onBlur,
  onChange,
}: InputProps): JSX.Element {
  console.log(isData);
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
        autoComplete="off"
      />
      <span className="form__input-error">
        {" "}
        {/* {isData?.isBlur && isData?.textError} */}
      </span>
    </div>
  );
}

export default InputPopup;
