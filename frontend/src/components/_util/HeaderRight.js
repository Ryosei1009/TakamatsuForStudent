import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getAccountData } from "../../utils/AccountUtil";

const HeaderRight = () => {
    const { isAuthenticated, isLoading, user } = useAuth0();
    const [eachAccount, setEachAccount] = useState({});
    useEffect(() => {
        getAccountData(user, setEachAccount);
    }, [user]);

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            {isAuthenticated && (
                <div>
                    <a href="/profile/" >
                        <img className="w-12 rounded-full" src={eachAccount.icon_name === undefined || eachAccount.icon_name === "" ? `http://localhost:8000/images/accounts/default.jpeg` : `http://localhost:8000/${eachAccount.icon_name}`} alt="" />
                    </a>
                </div>
            )}
        </>
    );
};

export default HeaderRight;