import bgdark from "../../public/bgdark.jpg";
import bglight from "../../public/bglight.jpg";
import Title from "./Title";
import ToDoBox from "./ToDoBox";

function BackGround({ mode, setMode }) {

  const backgroundStyle = {
    backgroundImage: `url(${mode === "dark-mode" ? bgdark : bglight})`,
    backgroundSize: "cover",
  };

  return (
    <div className={`w-full h-[100vh] ${mode === "dark-mode" ? "bg-[#161722]" : "bg-[#fafafa]"}`}>
      <div className="w-full h-[300px]" style={backgroundStyle}>
        <Title mode={mode} setMode={setMode}></Title>
        <ToDoBox mode={mode}></ToDoBox>
      </div>
    </div>
  );
}

export default BackGround;
