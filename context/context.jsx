import { createContext, useState } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [state, setState] = useState(undefined);

  // Transfer(address from, address to, uint256 tokenId);
  //   useContractEvent({
  //     ...contract,
  //     eventName: "Transfer",
  //     listener: event => {
  //       console.log(event);
  //       setEventData({ event: "Transfer", data: event });
  //     },
  //   });

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};
