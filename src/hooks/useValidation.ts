import { useState, useEffect } from "react";
import { IUseForm } from "./useForm";

export function useValidate(
  value: string,
  isBlur: boolean,
  sizeFile: number,
  inputName: string,
  validations: IUseForm
) {
  const [inputValid, setInputValid] = useState(false);
  const [isEmptyError, setIsEmptyError] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [fileNameError, setFileNameError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [textError, setTextError] = useState("");
  const [inputNotValide, setInputNotValide] = useState(false);

  useEffect(
    function (): void {
      for (const validation in validations) {
        // Валидация на пустой или нет
        if (validation === "isEmpty") {
          value ? setIsEmptyError(false) : setIsEmptyError(true);
        }

        // Валидация на минимальную длину
        if (validation === "minLength") {
          switch (inputName) {
            case "name":
              if (value.length < validations[validation]!) {
                setMinLengthError(true);
                setTextError("Минимальное количество знаков 2");
              } else {
                setMinLengthError(false);
                setTextError("");
              }
              break;
            case "family":
              if (value.length < validations[validation]!) {
                setMinLengthError(true);
                setTextError("Минимальное количество знаков 2");
              } else {
                setMinLengthError(false);
                setTextError("");
              }
              break;
            case "email":
              if (value.length < validations[validation]!) {
                setMinLengthError(true);
                setTextError("Минимальное количество знаков 3");
              } else {
                setMinLengthError(false);
                setTextError("");
              }
              break;
            case "textFeedback":
              if (value.length < validations[validation]!) {
                setMinLengthError(true);
                setTextError("Минимальное количество знаков 10");
              } else {
                setMinLengthError(false);
                setTextError("");
              }
              break;
            default:
              return setTextError("");
          }
        }

        // Валидация на соответствие email
        if (validation === "isEmail" && !minLengthError) {
          switch (inputName) {
            case "email":
              const patternEmail =
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
              const patternEmailBoolean = patternEmail.test(
                String(value).toLowerCase()
              );

              if (!patternEmailBoolean) {
                setEmailError(true);
                setTextError("Не соответствует формату user@mail.ru");
              } else {
                setEmailError(false);
                setTextError("");
              }
              break;
            default:
              return setTextError("");
          }
        }

        // Валидация имени, фамилии, файла в нужном формате
        if (validation === "isName" && !minLengthError) {
          switch (inputName) {
            case "name":
            case "family":
              const pattern = /^[a-zA-Zа-яА-Я -]+$/i;
              const patternBoolean = pattern.test(String(value).toLowerCase());

              if (!patternBoolean && inputNotValide) {
                setNameError(true);
                setTextError(
                  "Только буквы латинского или кириллического алфавита "
                );
                setInputNotValide(true);
              } else {
                setNameError(false);
                setTextError("");
                setInputNotValide(false);
              }
              break;
            case "file":
              const patternFile = /(\.jpg|\.png)$/i;
              const patternFileBoolean = patternFile.test(
                String(value).toLowerCase()
              );

              if (!patternFileBoolean) {
                setFileNameError(true);
                setTextError("Файл только формата jpg или png");
              } else {
                setFileNameError(false);
                setTextError("");
              }
              break;
            default:
              return setTextError("");
          }
        }
        if (validation === "isSizeFile" && !fileNameError) {
          switch (inputName) {
            case "file":
              if (sizeFile > 2) {
                setFileSizeError(true);
                setTextError("Допустимый размер файла 2 МБ.");
              } else {
                setFileSizeError(false);
                setTextError("");
              }
              break;
            default:
              return setTextError("");
          }
        }
      }
    },
    [
      isEmptyError,
      minLengthError,
      fileNameError,
      inputName,
      isBlur,
      sizeFile,
      validations,
      value,
      inputNotValide,
    ]
  );

  //Проверка валидности формы
  useEffect(() => {
    if (
      isEmptyError ||
      minLengthError ||
      emailError ||
      nameError ||
      fileNameError ||
      fileSizeError
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [
    isEmptyError,
    minLengthError,
    emailError,
    nameError,
    fileNameError,
    fileSizeError,
  ]);

  return {
    isEmptyError,
    minLengthError,
    textError,
    emailError,
    nameError,
    fileNameError,
    fileSizeError,
    inputValid,
  };
}
