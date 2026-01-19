import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="text-[2rem] text-orange-500" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="text-[2rem] text-orange-500" />
        ) : (
          <AiOutlineStar className="text-[2rem] text-orange-500" />
        )}
      </span>
    );
  });

  return (
    <section>
      <div className="flex gap-[0.2rem] items-center justify-start">
        {ratingStar}
        <p className="m-0 pl-[1.2rem]">({reviews} Customer reviews)</p>
      </div>
    </section>
  );
};

export default Star;
