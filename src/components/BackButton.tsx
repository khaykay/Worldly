import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }
  const style = " bg-black/10  rounded-full hover:bg-black/60  h-12 w-12 ";
  return (
    <button onClick={handleBack} className={style}>
      <span className="material-symbols-outlined text-yellow-900 hover:text-yellow-400 h-full w-full flex justify-center items-center ">
        arrow_back_ios
      </span>
    </button>
  );
}

export default BackButton;
