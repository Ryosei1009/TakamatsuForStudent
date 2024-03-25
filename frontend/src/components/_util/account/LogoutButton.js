import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Popover, Transition } from "@headlessui/react";
import { LogoutIcon } from "@heroicons/react/solid";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div>
      <Popover className="relative">
        <Popover.Button className="focus:outline-none px-2 py-2 bg-red-600 hover:bg-red-700 rounded">
          <LogoutIcon className="h-6 w-6 text-white" />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute">
            <div className="bg-gray-200 px-4 py-2 rounded-md shadow-md cursor-pointer hover:underline" onClick={handleLogout}>
              ログアウト
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default LogoutButton;