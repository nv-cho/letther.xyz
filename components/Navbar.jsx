import { useEffect, useState, useContext } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { Context } from "../context/context";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavbarComponent = () => {
  const [firstRender, setFirstRender] = useState(true);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const { isConnected } = useContext(Context);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    !firstRender && (
      <nav className="flex flex-row mt-2 p-1 justify-evenly items-center">
        🎶
        <ul className="flex flex-row gap-10">
          <li className="navbarButton">
            <Link href="/">Home</Link>
          </li>

          <li className="navbarButton">
            <Link href="/about">Explore</Link>
          </li>

          <li className="navbarButton">
            <Link href="/contact">Ask</Link>
          </li>
        </ul>
        {isConnected != true ? (
          <ConnectButton />
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
                    <Link href="/logout">Logout</Link>
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
