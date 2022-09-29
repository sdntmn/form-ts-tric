import { useState, useEffect } from 'react';

export function useValidate(value, validations, inputName, isBlur, sizeFile) {
  const [inputValid, setInputValid] = useState(false);
  const [isEmptyError, setIsEmptyError] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [fileNameError, setFileNameError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [textError, setTextError] = useState('');

  useEffect(
    function (evt) {
      for (const validation in validations) {
        // Валидация на пустой или нет
        if (validation === 'isEmpty') {
          value ? setIsEmptyError(false) : setIsEmptyError(true);
        }
        // Валидация на минимальную длину
        if (validation === 'minLength') {
          switch (inputName) {
            case 'name':
              if (value.length < validations[validation]) {
                setMinLengthError(true);
                setTextError('Минимальное количество знаков 2');
              } else {
                setMinLengthError(false);
                setTextError('');
              }

              break;
            case 'family':
              if (value.length < validations[validation]) {
                setMinLengthError(true);
                setTextError('Минимальное количество знаков 2');
              } else {
                setMinLengthError(false);
                setTextError('');
              }
              break;
            case 'email':
              if (value.length < validations[validation]) {
                setMinLengthError(true);
                setTextError('Минимальное количество знаков 3');
              } else {
                setMinLengthError(false);
                setTextError('');
              }
              break;
            case 'textFeedback':
              if (value.length < validations[validation]) {
                setMinLengthError(true);
                setTextError('Минимальное количество знаков 10');
              } else {
                setMinLengthError(false);
                setTextError('');
              }
              break;
            default:
              setTextError('');
          }
        }

        // Валидация на соответствие правильности написания имени и фамилии
        if (validation === 'isEmail' && !minLengthError) {
          switch (inputName) {
            case 'email':
              const patternEmail =
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
              const patternEmailBoolean = patternEmail.test(
                String(value).toLowerCase()
              );

              if (!patternEmailBoolean) {
                setEmailError(true);
                setTextError('Не соответствует формату user@mail.ru');
              } else {
                setEmailError(false);
                setTextError('');
              }
              break;
            default:
              setTextError('');
          }
        }
        // Валидация имени, фамилии, файла в нужном формате
        if (validation === 'isName' && !minLengthError) {
          switch (inputName) {
            case 'name':
            case 'family':
              const pattern = /^[a-zA-Zа-яА-Я -]+$/i;
              const patternBoolean = pattern.test(String(value).toLowerCase());

              if (!patternBoolean) {
                setNameError(true);
                setTextError(
                  'Только буквы латинского или кириллического алфавита '
                );
              } else {
                setNameError(false);
                setTextError('');
              }
              break;
            case 'file':
              const patternFile = /(\.jpg|\.png)$/i;
              const patternFileBoolean = patternFile.test(
                String(value).toLowerCase()
              );

              if (!patternFileBoolean) {
                setFileNameError(true);
                setTextError('Файл только формата jpg или png');
              } else {
                setFileNameError(false);
                setTextError('');
              }
              break;
            default:
              setTextError('');
          }
        }
        if (validation === 'isSizeFile' && !fileNameError) {
          if (sizeFile > 2) {
            setFileSizeError(true);
            setTextError('Допустимый размер файла 2 МБ.');
          } else {
            setFileSizeError(false);
            setTextError('');
          }
        }
      }
    },
    [
      fileNameError,
      inputName,
      isBlur,
      isEmptyError,
      minLengthError,
      sizeFile,
      validations,
      value,
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
