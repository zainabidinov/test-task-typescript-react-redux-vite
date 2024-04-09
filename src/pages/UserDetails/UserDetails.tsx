import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/index";
import { BsTelephone } from "react-icons/bs";
import { LiaEnvelope } from "react-icons/lia";
import "./UserDetails.css";
import logoutIcon from "../../assets/icons/logout-icon.svg";
import goBackIcon from "../../assets/icons/arrow-left-icon.svg";
import axios, { AxiosResponse } from "axios";
import { UserData } from "../../types";

function User() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<UserData> = await axios.get(
          `https://reqres.in/api/users/${userId}`
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userId]);

  function handleButtonClick(route: string) {
    if (route === "/signup") {
      localStorage.removeItem("token");
      navigate("/signup");
    } else {
      navigate("/");
    }
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details">
      <div className="user-details__header">
        <button
          className="user-details__header-button"
          onClick={() => handleButtonClick("/")}
        >
          Назад
        </button>
        <img
          src={goBackIcon}
          className="user-details__back-button-sm"
          onClick={() => handleButtonClick("/")}
        />

        <div className="user-details__header-content">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
          />
          <div>
            <h1>
              {user.first_name} {user.last_name}
            </h1>
            <p>Партнер</p>
          </div>
        </div>

        <button
          className="user-details__header-button"
          onClick={() => handleButtonClick("/signup")}
        >
          Выход
        </button>
        <img
          src={logoutIcon}
          className="user-details__logout-button-sm"
          onClick={() => handleButtonClick("/signup")}
        />
      </div>

      <div className="user-details__body-content">
        <div className="user-details__body-text">
          <p>
            Клиенты видят в нем эксперта по вопросам разработки комплексных
            решений финансовых продуктов, включая такие аспекты, как
            организационная структура, процессы, аналитика и ИТ-компоненты. Он
            помогает клиентам лучше понимать структуру рисков их бизнеса,
            улучшать процессы за счет применения новейших технологий и
            увеличивать продажи, используя самые современные аналитические
            инструменты.
          </p>
          <p>
            В работе с клиентами недостаточно просто решить конкретную проблему
            или помочь справиться с трудностями. Не менее важно уделять внимание
            обмену знаниями: "Один из самых позитивных моментов — это осознание
            того, что ты помог клиенту перейти на совершенно новый уровень
            компетентности, уверенность в том, что после окончания проекта у
            клиента есть все необходимое, чтобы дальше развиваться
            самостоятельно".
          </p>
          <p>
            Помимо разнообразных проектов для клиентов финансового сектора,
            Сорин ведет активную предпринимательскую деятельность. Он является
            совладельцем сети клиник эстетической медицины в Швейцарии,
            предлагающей инновационный подход к красоте, а также инвестором
            других бизнес-проектов.
          </p>
        </div>

        <div className="user-details__body-contact">
          <div className="user-details__contact">
            <span className="user-details__icon-phone">
              <BsTelephone />
            </span>
            <span>+7 (954) 333-44-55</span>
          </div>

          <div className="user-details__contact">
            <span className="user-details__icon-email">
              <LiaEnvelope />
            </span>
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
