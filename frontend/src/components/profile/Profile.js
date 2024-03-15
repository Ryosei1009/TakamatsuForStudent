import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../_util/account/LogoutButton";
import Icon from "./components/Icon";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { fetchData } from "../../utils/DatabaseUtil";
import Form from "./components/Form";

const Profile = () => {
  const { user } = useAuth0();
  const [eachAccount, setEachAccount] = useState({});

  useEffect(() => {
    fetchData('/api/accounts', setEachAccount, user, "e_mail", "email");
  }, [user]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            Profile - TCFS
          </title>
        </Helmet>
      </HelmetProvider>
      <div className="mx-96 max-2xl:mx-64 max-xl:mx-52 max-lg:mx-36 max-md:mx-24 max-sm:mx-8 my-8">
        <div className="text-4xl font-bold my-6">
          Your profile
        </div>
        {eachAccount.id ? (
          <Icon eachAccount={eachAccount} />
        ) : ""}
        <Form eachAccount={eachAccount} user={user} />
        <LogoutButton />
      </div>
    </>
  );
};

export default Profile;