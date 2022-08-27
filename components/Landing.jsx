import { useState } from "react";
import { useRouter } from "next/router";

const Landing = () => {
  const router = useRouter();

  const handler = () => {
    router.push("/about");
  };

  return (
    <>
      <div className="flex flex-col gap-24 h-full justify-center items-center">
        <p className="text-[100px] text-center">Welcome to Letther</p>

        <button
          onClick={handler}
          className="bg-green-200/30 py-8 px-4 rounded-lg shadow-lg hover:-translate-y-3 duration-150"
        >
          <p className="text-[60px] text-center text-green-200">GET STARTED</p>
        </button>
      </div>
    </>
  );
};

export default Landing;
