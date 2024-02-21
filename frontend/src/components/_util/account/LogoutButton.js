import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div>
      {showConfirmation ? (
        <div className="bg-white p-4 border rounded shadow flex justify-between items-center">
          <p className="text-lg">本当にログアウトしますか？</p>
          <div className="flex justify-end">
            <button
              onClick={() => setShowConfirmation(false)}
              className="mr-2 px-4 py-2 border rounded text-gray-600"
            >
              キャンセル
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded"
            >
              ログアウト
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowConfirmation(true)}
          className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded"
        >
          ログアウト
        </button>
      )}
    </div>
  );
};

export default LogoutButton;