import Menu from "./Menu";

const NavBar = () => {
  return (
    <header className="w-full flex items-center justify-between mb-1 px-2 lg:pt-3 pr-4 pt-1 sm:pt-2 z-10">
      <div className="flex items-center justify-center">
        <img
          src="/assets/logo3D-min.png"
          alt="Svg"
          className="w-16 translate-y-[4px]"
        />
        <p className="hidden sm:flex font-bold text-2xl text-gray-700">
          jsDreamers
        </p>
      </div>
      <Menu />
    </header>
  );
};

export default NavBar;
