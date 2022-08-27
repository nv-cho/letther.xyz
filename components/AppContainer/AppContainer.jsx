import React from "react";

const AppContainer = ({ children }) => {
  return (
    // full width container
    <div className="w-full h-full bg-gradient flex justify-center text-white">
      {/* app container 11/12 width to let some space  */}
      <div className="w-11/12 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default AppContainer;
