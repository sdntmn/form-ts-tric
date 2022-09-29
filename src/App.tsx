import { useState } from "react";
import Input from "./components/Input";
import TextArea from "./components/Textarea";
import { useForm } from "./hooks/useForm";

interface FeedbackForm {
  id: number;
  name: string;
  family: string;
  email: string;
  category: string;
  textFeedback: string;
  file: string;
}

type IFeedback = {
  id?: number;
  name: string;
  family: string;
  email: string;
  category: string;
  textFeedback: string;
  file: string;
};

function App(): JSX.Element {
  const name = useForm("", { isEmpty: true, minLength: 2, isName: true });
  const family = useForm("", { isEmpty: true, minLength: 2, isName: true });
  const email = useForm("", { isEmpty: true, minLength: 3, isEmail: true });
  const category = useForm("", { isEmpty: true });
  const textFeedback = useForm("", { isEmpty: true, minLength: 10 });
  const file = useForm("", { isEmpty: true, isName: true, isSizeFile: 2 });

  const [resultEvent, setResultEvent] = useState({});
  const [listFeedback, setListFeedback] = useState([{}]);

  function addFeedback(feedback: IFeedback) {
    setListFeedback((prev) => [...prev, feedback]);
  }

  const submitHandler = async (
    event: React.FormEvent<HTMLFormElement & FeedbackForm>
  ): Promise<void> => {
    event.preventDefault();

    const result: IFeedback = {
      id: Math.floor(Math.random() * 1000000),
      name: name.value || "",
      family: family.value || "",
      email: email.value,
      category: category.value,
      textFeedback: textFeedback.value,
      file: file.value,
    };

    setResultEvent(result);
    addFeedback(result);
    name.resetFrom();
    family.resetFrom();
    email.resetFrom();
    category.resetFrom();
    textFeedback.resetFrom();
    file.resetFrom();
  };

  const buttonDisabled: boolean =
    !file.inputValid ||
    !textFeedback.inputValid ||
    !category.inputValid ||
    !email.inputValid ||
    (!family.inputValid && !name.inputValid);

  // // Оставил чтобы видно было сохранение данных
  console.log(resultEvent);
  console.log(listFeedback);
  return (
    <div className="feedback container">
      <h1 className="feedback__title">Обратная связь</h1>

      <form className="form feedback__form" onSubmit={submitHandler}>
        <Input
          name="name"
          type="text"
          className="form__input"
          placeholder="Имя"
          value={name.value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            name.handleChange(event)
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            name.onBlur(event)
          }
          isData={name}
        />

        <Input
          name="family"
          type="text"
          className="form__input"
          placeholder="Фамилия"
          value={family.value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            family.handleChange(event)
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            family.onBlur(event)
          }
          isData={family}
        />

        <Input
          name="email"
          type="email"
          className="form__input"
          placeholder="Эл.почта"
          value={email.value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            email.handleChange(event)
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            email.onBlur(event)
          }
          isData={email}
        />

        <div className="select">
          <label
            className="form__label form__label-extend"
            htmlFor="standard-select"
          >
            Категория обращения:
          </label>
          <select
            className="select__sel"
            id="standard-select"
            name="category"
            value={category.value}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              category.handleChange(event)
            }
            onBlur={(event: React.FocusEvent<HTMLSelectElement>) =>
              category.onBlur(event)
            }
          >
            <option
              value="0 category"
              style={{ userSelect: "none", display: "none" }}
            ></option>
            <option value="1 category">1 категория</option>
            <option value="2 category">2 категория</option>
            <option value="3 category">3 категория</option>
            <option value="4 category">4 категория</option>
          </select>
          <span className="form__input-error">
            {category.isBlur && !category.value ? "Выберите категорию." : ""}
          </span>
        </div>
        <TextArea
          placeholder="Сообщение"
          name="textFeedback"
          value={textFeedback.value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            textFeedback.handleChange(event)
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            textFeedback.onBlur(event)
          }
          isData={textFeedback}
        />
        <Input
          name="file"
          type="file"
          className="form__input"
          value={file.value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            file.handleChange(event)
          }
          onBlur={(event: React.FocusEvent<HTMLInputElement>) =>
            file.onBlur(event)
          }
          isData={file}
        />
        <button
          type="submit"
          className="form__button"
          disabled={buttonDisabled}
        >
          Отправить
        </button>
      </form>
    </div>
  );
}

export default App;
