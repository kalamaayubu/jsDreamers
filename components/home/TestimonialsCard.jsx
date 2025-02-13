const TestimonialCard = ({ img, name, role, testimony }) => {
  return (
    <div className="mx-2 my-2 p-4 rounded-lg shadow-md border border-gray-200 ">
      <div className="">
        <img src="/assets/quote.svg" className="" />
      </div>
      <p className="text-gray-700 break-words whitespace-normal overflow-hidden mb-2">
        {testimony}
      </p>
      <div className="flex items-center gap-4">
        <img
          src={`/assets/${img}`}
          className="object-cover w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <p className="font-semibold">{name}</p>
          <p className="text-gray-700">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
