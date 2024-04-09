import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../types";
import "./Home.css";
import { RootState } from "../../store/index";
import { setUsers } from "../../store/actions/userActions";
import logoutIcon from "../../assets/icons/logout-icon.svg";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ data: UserData[] }> = await axios.get(
          "https://reqres.in/api/users?page=1&per_page=8"
        );
        const responseData: UserData[] = response.data.data;
        dispatch(setUsers(responseData));
        console.log(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/signup");
  }

  useEffect(function navigateToSignUp() {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
    }
  }, []);

  function handleUserClick(userId: string) {
    navigate(`/user/${userId}`);
  }

  return (
    <div className="home">
      <div className="home__header">
        <button className="home__header-button" onClick={handleLogOut}>
          Выход
        </button>
        <img
          src={logoutIcon}
          className="header-button-sm"
          onClick={handleLogOut}
        />
        <div className="home__header-content">
          <h1>Наша команда</h1>
          <h2>
            Это опытные специалисты, хорошо разбирающиеся во всех задачах,
            которые ложатся на их плечи, и умеющие находить выход из любых, даже
            самых сложных ситуаций.
          </h2>
        </div>
      </div>

      <div className="home__body">
        <div className="home__body-users">
          {users.map((user) => (
            <div
              key={user.id}
              className="user-card"
              onClick={() => handleUserClick(user.id)}
            >
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
              />
              <p>
                {user.first_name} {user.last_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
