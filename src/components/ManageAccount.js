import React, { useEffect, useState } from "react";
import Admin from "./Admin";
import axios from "axios";
import UserInfo from "./UserInfo";
function ManageAccount() {
  const api = axios.create({
    baseURL: "http://localhost:4000/",
  });
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      const user = await api.get("get-users", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(user.data);
      setUsers(user.data);
    };
    fetchUsers();
  }, []);
  const deleteUser = async (email) => {
    const user = await api.delete("delete-user", {
      data: {
        email,
      },
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setUsers((prev) => {
      const newUser = prev.filter((prevUser) => prevUser.email !== email);
      return newUser;
    });
    console.log(user);
  };
  return (
    <>
      <Admin />
      {users &&
        users.map((user, i) => {
          return (
            <UserInfo
              key={i}
              name={user.name}
              email={user.email}
              role={user.role}
              delFunc={deleteUser}
              userClass={user.class}
            />
          );
        })}
    </>
  );
}

export default ManageAccount;
