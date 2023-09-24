import ModeIcons from "../assets/Icons/ModeIcons";

function Title({ mode, setMode }) {
  function handlemode() {
    setMode((prevMode) => (prevMode === "dark-mode" ? "light-mode" : "dark-mode"));
  }

  return (
    <div className="flex flex-row justify-between items-center w-[40vw] mx-auto pt-[50px]">
      <div className="font-bold text-white">
        <h1 className="text-3xl ">T O D O</h1>
      </div>

      <div className={`cursor-pointer text-white ${mode==="dark-mode"?"hover:text-yellow-500":"hover:text-gray-800"}`}
       onClick={handlemode}>
        {mode === "dark-mode" ? ModeIcons.sun : ModeIcons.moon}
      </div>
    </div>
  );
}

export default Title;
