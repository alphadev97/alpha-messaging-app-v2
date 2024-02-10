import ThemeToggle from "../lib/ThemeToggle";
import useFetcher from "../redux/hooks/useFetcher";
import Logo from "./Logo";

const Header = () => {
  const { selectedUser } = useFetcher();

  return (
    <div className="bg-background text-text flex justify-between items-center p-2">
      <div className="w-[60px]">
        <Logo />
      </div>
      {selectedUser && (
        <div>
          <p className="flex items-center gap-3">
            <span className="text-2xl bg-gradient-to-r from-blue-600 via-pink-600 to-pink-400 inline-block text-transparent bg-clip-text">
              Greetings
            </span>
            👋{"  "}
            <span className="font-semibold text-2xl">
              {selectedUser.user.username}
            </span>
          </p>
        </div>
      )}

      {!selectedUser && (
        <div>
          <p className="text-2xl font-semibold">AlphaMessenger</p>
        </div>
      )}

      <div className="w-[100px]">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
