import { createContext, useState } from "react";
import { useAccount } from "wagmi";

export const Context = createContext();

export const ContextProvider = ({ children }) => {

  const { address, isConnected } = useAccount();

  // Transfer(address from, address to, uint256 tokenId);
  //   useContractEvent({
  //     ...contract,
  //     eventName: "Transfer",
  //     listener: event => {
  //       console.log(event);
  //       setEventData({ event: "Transfer", data: event });
  //     },
  //   });

  return (
    <Context.Provider value={{ address, isConnected }}>
      {children}
    </Context.Provider>
  );
};
