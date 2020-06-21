import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { IMaskInput } from "react-imask";
import axios from "axios";
import Header from "./Header";
import Succsess from "./Succsess";

const Register = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setisChecked] = useState(false);
  const [mask, setMask] = useState(true);

  const history = useHistory();

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
      case "name":
        setName(value);
        break;
      case "login":
        setLogin(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        console.log(value);
        setPhone(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "rules":
        setisChecked(checked);
        break;
      default:
        break;
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      login,
      email,
      phone,
      password,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      const body = JSON.stringify(newUser);
      const res = await axios.post("/api/users", body, config);
      let succsess = document.querySelector(".succsess");
      succsess.classList.add("succsess-transition");
      setTimeout(() => history.push("/login"), 3000);
    } catch (error) {
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    document.querySelector(".phone").addEventListener("change", (event) => {
      console.log(event);
      handleChange(event);
    });
  });

  return (
    <Fragment>
      <div className="wrapper">
        <Header title={"Регистрация"} />
        <div className="container">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                className="name"
                onChange={(event) => handleChange(event)}
                placeholder=" "
                minLength="3"
                required
              />
              <label htmlFor="name">Имя</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="login"
                id="login"
                value={login}
                className="login"
                onChange={(event) => handleChange(event)}
                minLength="3"
                placeholder=" "
                required
              />
              <label htmlFor="login">Никнейм</label>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                className="email"
                onChange={(event) => handleChange(event)}
                type="email"
                placeholder=" "
                required
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-group">
              <IMaskInput
                mask="+{7} 000 000 00 00"
                lazy={mask}
                type="tel"
                id="phone"
                placeholderChar="_"
                placeholder=" "
                value={phone}
                name="phone"
                className="phone"
                pattern="[789][0-9]{9}"
                required
                onFocus={() => setMask(false)}
                onBlur={() => setMask(true)}
              />
              <label htmlFor="phone">Телефон</label>
            </div>
            <div className="form-group">
              <input
                name="password"
                id="password"
                value={password}
                className="password"
                onChange={(event) => handleChange(event)}
                type="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                placeholder=" "
                required
              />
              <label htmlFor="password">Пароль</label>
              <p className="pass-eye" onClick={onShow}></p>
            </div>
            <div className="form-group form-group--check">
              <input
                type="checkbox"
                name="rules"
                checked={isChecked}
                id="rules"
                className="rules"
                onChange={(event) => handleChange(event)}
                required
              />
              <label htmlFor="rules">
                Я даю свое согласие на обработку персональных данных
              </label>
            </div>
            <button type="submit" className="btn" disabled={!isChecked}>
              Зарегистрироваться
            </button>
          </form>
          <div className="tologin">
            <p>Есть аккаунт?</p>
            <Link to="/login">Войти</Link>
          </div>
        </div>
      </div>
      <Succsess text={"Вы зарегистрированы"} />
      <Fragment />
    </Fragment>
  );
};
export default Register;
