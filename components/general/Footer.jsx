const Footer = () => {
  return (
    <footer className="w-full mt-20">
      <div></div>
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 to-pink-500" />
      <div className="mt-1">
        <p>
          &copy; {new Date().getFullYear()} jsDreamers. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
