import React, { useState } from "react";
import PasswordField from "../../components/PasswordField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const navigate = useNavigate();

  const validateInputs = (): boolean => {
    let isValid: boolean = true;

    if (!name) {
      setNameError("Введите имя");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Введите электронную почту");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Введите пароль");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Подтвердите пароль");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Пароли не совпадают");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (validateInputs()) {
      const formData = {
        name: name,
        email: email,
        password: password,
      };

      try {
        const response = await axios.post(
          "https://reqres.in/api/register",
          formData
        );

        console.log("Registration successful:", response.data);
        console.log("token", response.data.token);
        localStorage.setItem("token", response.data.token);

        navigate("/");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={handleSubmit}>
        <h2 className="signup__title">Регистрация</h2>
        <div className="signup__field">
          <label htmlFor="name" className="signup__label">
            Имя
          </label>
          <input
            type="text"
            id="name"
            className={`signup__input ${nameError && "signup__input--error"}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <span className="error-message">{nameError}</span>}
        </div>
        <div className="signup__field">
          <label htmlFor="email" className="signup__label">
            Электронная почта
          </label>
          <input
            type="email"
            id="email"
            className={`signup__input ${emailError && "signup__input--error"}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <span className="error-message">{emailError}</span>}
        </div>
        <div className="signup__field">
          <label htmlFor="password" className="signup__label">
            Пароль
          </label>
          <PasswordField
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            passwordError={passwordError}
          />
          {passwordError && (
            <span className="error-message">{passwordError}</span>
          )}
        </div>
        <div className="signup__field">
          <label htmlFor="confirmPassword" className="signup__label">
            Подтвердите пароль
          </label>
          <PasswordField
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            confirmPassword={confirmPassword}
          />
          {confirmPasswordError && (
            <span className="error-message">{confirmPasswordError}</span>
          )}
        </div>

        <div className="signup__button">
          <button type="submit">Зарегистрироваться</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
