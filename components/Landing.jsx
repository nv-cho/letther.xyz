const Landing = () => {
  return (
    <div className="flex flex-col gap-24 h-full justify-center items-center">
      <p className="text-[100px] text-center">Welcome to Letther</p>

      <button className="bg-green-200/30 py-8 px-4 rounded-lg shadow-lg hover:-translate-y-3 duration-150">
        <p className="text-[60px] text-center text-primary">GET STARTED</p>
      </button>
    </div>
  );
};

export default Landing;
