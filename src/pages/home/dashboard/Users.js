import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../../../firebase.init";
import UserRaw from "./UserRaw";

const Users = () => {
  //   const [user, Loading] = useAuthState(auth);
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch("https://guarded-ocean-54362.herokuapp.com/users").then((res) =>
      res.json()
    )
  );

  if (isLoading) {
    return <h3>Loading</h3>;
  }
  return (
    <div>
      <h2 className="text-2xl">All user</h2>
      <div className="overflow-x-auto mt-5">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>email</th>
              <th>Make Admin</th>
              <th>Remove user</th>
            </tr>
          </thead>
          {users.map((user, index) => (
            <UserRaw key={index} user={user} index={index} refetch={refetch} />
          ))}
        </table>
      </div>
    </div>
  );
};

export default Users;
