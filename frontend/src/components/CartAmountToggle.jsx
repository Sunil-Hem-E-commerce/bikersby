import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartAmountToggle = ({ qty, setDecrease, setIncrease }) => {
  return (
    <div className="flex items-center justify-start gap-[1.6rem] my-[1.6rem]">
      <button
        onClick={() => setDecrease()}
        className="w-[3rem] h-[3rem] flex items-center justify-center border border-[#8490ff]/40 rounded-full bg-white text-[#1d1d1d] cursor-pointer hover:bg-[#8490ff] hover:text-white transition-all duration-200"
      >
        <FaMinus />
      </button>
      <div className="min-w-[4rem] text-center text-[2.4rem] text-[#6254F3] font-medium">
        {qty}
      </div>
      <button
        onClick={() => setIncrease()}
        className="w-[3rem] h-[3rem] flex items-center justify-center border border-[#8490ff]/40 rounded-full bg-white text-[#1d1d1d] cursor-pointer hover:bg-[#8490ff] hover:text-white transition-all duration-200"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default CartAmountToggle;
