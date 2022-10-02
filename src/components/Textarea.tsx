interface ITextAreaProps {
  name: string;
  value: string;
  isData: boolean;
  placeholder?: string;
  textError: string;
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = function ({
  name,
  value,
  isData,
  textError,
  placeholder,
  onChange,
  onBlur,
}: ITextAreaProps) {
  return (
    <div className="form__wrap">
      <label className="form__label form__label-extend">{placeholder}</label>
      <textarea
        className="form__textarea"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      ></textarea>

      <span className="form__input-error"> {isData && textError}</span>
    </div>
  );
};

export default TextArea;
