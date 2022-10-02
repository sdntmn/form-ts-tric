import { useState, useCallback } from "react";
import { useValidate } from "./useValidation";

export interface IUseForm {
  isEmpty: boolean;
  minLength?: number;
  isName?: boolean;
  isEmail?: boolean;
  isSizeFile?: number;

  [key: string]: unknown;
}

export function useForm(
  _initialValue: string,
  validations: IUseForm
): {
  inputName: string;
  sizeFile: number;
  isEmptyError: boolean;
  minLengthError: boolean;
  textError: string;
  emailError: boolean;
  nameError: boolean;
  fileNameError: boolean;
  fileSizeError: boolean;
  inputValid: boolean;
  value: string;
  isBlur: boolean;
  resetFrom: (newValues?: string, newIsValid?: boolean) => void;
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleChangeFiles: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (
    event: React.FocusEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
} {
  const [value, setValue] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [isBlur, setBlur] = useState<boolean>(false);
  const [sizeFile, setSizeFile] = useState<number>(0);
  const valid = useValidate(value, isBlur, sizeFile, inputName, validations);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const input = event.target;
    const nameInput = input.name;
    const inputValue = input.value;

    setValue(inputValue);
    setInputName(nameInput);
  };

  const handleChangeFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const nameInput = input.name;
    const inputValue = input.value;
    setInputName(nameInput);

    if (input.files !== null) {
      const file = input.files[0];
      const sizePicture: number = file.size / 1024 / 1024;
      setValue(inputValue);
      setSizeFile(sizePicture);
    }
  };

  const onBlur = (event: React.FormEvent) => {
    setBlur(true);
  };

  const resetFrom = useCallback(
    (newValues = "", newIsValid = false) => {
      setValue(newValues);
      setBlur(newIsValid);
    },
    [setValue, setBlur]
  );

  return {
    value,
    isBlur,
    ...valid,
    sizeFile,
    inputName,
    onBlur,
    resetFrom,
    handleChange,
    handleChangeFiles,
  };
}
