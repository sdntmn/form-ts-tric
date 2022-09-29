interface ITextAreaProps {
  name: string;

  value: string;

  placeholder?: string;
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  isData: boolean;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = function ({
  name,
  value,
  onChange,
  placeholder,
  onBlur,
  isData,
}: ITextAreaProps) {
  return (
    <div className="form__wrap">
      <label className="form__label form__label-extend">{placeholder}</label>
      <textarea
        className="form__textarea"
        type="textarea"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      ></textarea>

      <span className="form__input-error">
        {" "}
        {isData?.isBlur && isData?.textError}
      </span>
    </div>
  );
};

export default TextArea;
