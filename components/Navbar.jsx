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

  const lensId = "0x01";

  const { isConnected } = useContext(Context);
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    !firstRender && (
      <nav className="flex flex-row p-1 items-center mt-6 mb-4 justify-between">
        <div className="flex items-center">
          <p className="text-[80px]">L</p>
          <ul className="flex flex-row gap-[13px] ml-10">
            <li className={`navbarButton ${router.pathname == "/" && "bg-primary text-black"}`}>
              <Link href="/">Home</Link>
            </li>

            <li
              className={`navbarButton ${
                router.pathname === "/explore" && "bg-primary text-black"
              }`}
            >
              <Link href="/explore">Explore</Link>
            </li>

            <li
              className={`navbarButton ${router.pathname === "/post" && "bg-primary text-black"}`}
            >
              <Link href="/post">Questions</Link>
            </li>
          </ul>
        </div>

        {isConnected != true ? (
          <div>
            <ConnectButton.Custom>
              {({ openConnectModal }) => {
                return (
                  <button
                    className="bg-white text-[#1D1D42] py-2 px-3 rounded-sm shadow-lg hover:bg-white/70 hover:scale-[1.02] transition-all duration-200"
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
              className="cursor-pointer rounded-full border-2 border-green-200"
            >
              <img className="rounded-full w-10 h-10" src="/lens2.jpg" />
            </button>

            {toggle && (
              <div className="min-w-[100px] absolute bg-white text-[#1D1D42] rounded-lg shadow-lg overflow-hidden mt-2 z-10">
                <ul className="flex flex-col">
                  <li className="navbarButton border-b p-2">
                    <Link href={`/profile/${lensId}`}>Profile</Link>
                  </li>
                  <li className="min-w-[100px] px-3 py-1 rounded-sm text-center hover:bg-purple-300/60 duration-150 border-t p-2">
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
