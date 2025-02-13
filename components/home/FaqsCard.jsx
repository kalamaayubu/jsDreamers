import Image from "next/image";

const FaqsCard = ({ id, question, answer }) => {
  return (
    <div className="accordion max-w-[900px] m-auto border p-4 w-full rounded-lg">
      <input type="radio" name="accordion" id={id} className="peer hidden" />
      <label
        htmlFor={id}
        className="font-semibold text-xl cursor-pointer flex gap-4 w-full justify-between"
      >
        <p>{question}</p>
        <Image
          width={20}
          height={30}
          src="/assets/plus.svg"
          alt="Toggle"
          className="peer-checked:hidden" // Hide this when radio is checked
        />
        <Image
          width={20}
          height={30}
          src="/assets/minus.svg"
          alt="Toggle"
          className="peer-checked:block hidden" // Show this when radio is checked
        />
      </label>
      <div className="accordion_content hidden peer-checked:flex mt-2">
        <p className="border-l-2 border-gray-300 pl-3 text-gray-700">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FaqsCard;
