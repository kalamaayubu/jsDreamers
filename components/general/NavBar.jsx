import Menu from "./Menu";

const NavBar = () => {
  return (
    <header className="w-full flex items-center justify-between mb-1 px-2 pt-3">
      <div className="flex items-center">
        <img src="/assets/logo.svg" alt="Svg" className="w-9" />
        <p className="hidden sm:flex bg-gradient-to-br from-blue-700 from-20% via-purple-600 via-90% bg-clip-text text-transparent font-semibold text-xl">
          &nbsp;&nbsp;&nbsp;jsDreamers
        </p>
      </div>
      <Menu />
    </header>
  );
};

export default NavBar;
