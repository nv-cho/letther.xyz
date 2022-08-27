import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Avatar } from "@nextui-org/react";

import { Context } from "../context/context";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavbarComponent = () => {
  const router = useRouter();

  const { isConnected, address } = useContext(Context);

  return (
    <nav className="flex flex-row mt-2 p-1 justify-evenly items-center">
      🎶
      <ul className="flex flex-row gap-10 ">
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/about">Explore</Link>
        </li>

        <li>
          <Link href="/contact">Ask</Link>
        </li>

        <li>
          <Link href="/contact">Profile</Link>
        </li>
      </ul>
      {isConnected != true ? (
        <ConnectButton />
      ) : (
        <button className="w-12 cursor-pointer rounded-full border-2 border-green-200">
          <img
            className="rounded-full"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        </button>
      )}
    </nav>
  );
};

export default NavbarComponent;
