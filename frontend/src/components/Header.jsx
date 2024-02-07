import ThemeToggle from "../lib/ThemeToggle";

const Header = () => {
  return (
    <div className="bg-background">
      <div className="w-[100px]">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
