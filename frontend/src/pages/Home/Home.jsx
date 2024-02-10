import useFetcher from "../../redux/hooks/useFetcher";
import FriendsList from "../../components/FriendsList";

const Home = () => {
  const { selectedUser } = useFetcher();

  return (
    <div>
      <div className="w-[250px] h-full bg-background">
        <FriendsList friendsList={selectedUser} />
      </div>
    </div>
  );
};

export default Home;
