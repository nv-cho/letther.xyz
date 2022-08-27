import { useEffect, useState, useContext } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { Context } from "../context/context";

import { useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavbarComponent = () => {
  const [firstRender, setFirstRender] = useState(true);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const { isConnected } = useContext(Context);
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    !firstRender && (
      <nav className="flex flex-row p-1 items-center mt-6 justify-between">
        <div className="flex items-center">
          <p className="text-[95px]">L</p>
          <ul className="flex flex-row gap-[13px] ml-10">
            <li
              className={`navbarButton ${
                router.pathname == "/" && "bg-green-300/80"
              }`}
            >
              <Link href="/">Home</Link>
            </li>

            <li
              className={`navbarButton ${
                router.pathname === "/explore" && "bg-green-300/80"
              }`}
            >
              <Link href="/explore">Explore</Link>
            </li>

            <li
              className={`navbarButton ${
                router.pathname === "/ask" && "bg-green-300/80"
              }`}
            >
              <Link href="/ask">Questions</Link>
            </li>
          </ul>
        </div>

        {isConnected != true ? (
          <div>
            <ConnectButton.Custom>
              {({ openConnectModal }) => {
                return (
                  <button
                    className="bg-white text-[#1D1D42] py-2 px-3 rounded-sm shadow-lg"
                    onClick={openConnectModal}
                  >
                    Connect Wallet
                  </button>
                );
              }}
            </ConnectButton.Custom>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                setToggle(!toggle);
              }}
              className="w-12 cursor-pointer rounded-full border-2 border-green-200"
            >
              <img
                className="rounded-full"
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              />
            </button>

            {toggle && (
              <div className="min-w-[100px] absolute bg-white text-[#1D1D42] rounded-lg shadow-lg overflow-hidden mt-2">
                <ul className="flex flex-col">
                  <li className="navbarButton border-b p-2">
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li className="min-w-[100px] px-3 py-1 rounded-sm text-center hover:bg-red-300/80 duration-150 border-t p-2">
                    <button onClick={() => disconnect()}>Sign out</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>
    )
  );
};

export default NavbarComponent;
