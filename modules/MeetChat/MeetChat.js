import CreateRoom from "@/components/room-joiner/CreateRoom";
import Auth from "./Auth";

const MeetChat = () => {
  return (
    <div>
      <Auth />
      <CreateRoom />
    </div>
  );
};

export default MeetChat;
