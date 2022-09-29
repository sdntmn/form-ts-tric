import { useState, useCallback } from "react";
import { useValidate } from "./useValidation";

interface IUseForm {
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
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (event: React.FormEvent) => void;
} {
  const [value, setValue] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [isBlur, setBlur] = useState<boolean>(false);
  const [sizeFile, setSizeFile] = useState<number>(0);
  const valid = useValidate(value, validations, inputName, isBlur, sizeFile);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input: EventTarget & HTMLInputElement = event.target;
    const nameInput = input.name;
    const inputValue = input.value;

    setValue(inputValue);
    setInputName(nameInput);
    if (nameInput === "file") {
      if (input.files !== null) {
        const file = input.files[0];
        const sizePicture: number = file.size / 1024 / 1024;

        setSizeFile(sizePicture);
      }
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
    handleChange,
    onBlur,
    ...valid,
    inputName,
    sizeFile,
    resetFrom,
  };
}
