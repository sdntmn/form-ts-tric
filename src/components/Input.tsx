interface InputProps {
  name: string;
  type: string;
  value: string;
  onChange: any;
  className: string;
  placeholder?: string;
  onBlur: any;
  isData: boolean;
}

function InputPopup({
  name,
  type,
  value,
  onChange,
  className,
  placeholder,
  onBlur,
  isData,
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
