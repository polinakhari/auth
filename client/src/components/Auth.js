import React, { Fragment, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Succsess from "./Succsess";
import { Link } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setisChecked] = useState(true);

  const onShow = () => {
    const pwd = document.querySelector(".password");
    if (pwd.type === "password") {
      pwd.type = "text";
    } else {
      pwd.type = "password";
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const User = {
      email,
      password,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      const body = JSON.stringify(User);
      const res = await axios.post("/api/auth", body, config);
      let succsess = document.querySelector(".succsess");
      succsess.classList.add("succsess-transition");
    } catch (error) {
      let err = document.querySelector(".error");
      err.classList.remove("error-hide");
      console.error(error.response.data);
    }
  };

  return (
    <Fragment>
      <div className="wrapper">
        <Header title={"Вход"} />
        <div className="container">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                name="email"
                value={email}
                className="email"
                onChange={(event) => handleChange(event)}
                placeholder=" "
                required
              />
              <label htmlFor="email">Email или номер телефона</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="password"
                value={password}
                className="password"
                onChange={(event) => handleChange(event)}
                onClick={(event) => onShow(event)}
                type="password"
                placeholder=" "
                required
              />
              <label htmlFor="password">Пароль</label>
              <p className="pass-eye" onClick={onShow}></p>
            </div>
            <p className="error error-hide">Данные введены неверно</p>
            <button type="submit" className="btn" disabled={!isChecked}>
              Войти
            </button>
          </form>
          <div className="tologin">
            <p>Нет аккаунта?</p>
            <Link to="/">Зарегистироваться</Link>
          </div>
        </div>
      </div>
      <Succsess text={"Вы успешно авторизованы"} />
      <Fragment />
    </Fragment>
  );
};

export default Auth;
