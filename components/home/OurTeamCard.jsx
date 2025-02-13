const OurTeamCard = ({ img, name, role, comment }) => {
  return (
    <div className="p-4 mx-2 my-2 shadow-md rounded-lg border flex-1 flex flex-col min-w-[200px]">
      <div className="flex gap-4 items-center justify-center">
        <img
          src={`/assets/${img}`}
          className="object-cover h-12 w-12 rounded-full"
        />
        <div className="flex flex-1 flex-col">
          <p className="font-semibold block">{name} </p>
          <p className="font-semibold self-start text-gray-500">{role} </p>
        </div>
      </div>
      <p>{comment}</p>
    </div>
  );
};

export default OurTeamCard;
