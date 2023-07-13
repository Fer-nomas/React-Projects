const squareStyle =
  "w-[80px] h-[80px] border-2 flex justify-center items-center text-5xl font-bold cursor-pointer select-none rounded-sm";
const isSelectStyle = "bg-blue-900 border-blue-900";

export const Square = ({ children, isSelect, updateBoard, index }) => {
  const className = `${squareStyle} + ${isSelect ? isSelectStyle : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
