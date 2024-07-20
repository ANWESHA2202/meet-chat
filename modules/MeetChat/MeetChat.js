import CreateRoom from "@/components/room-creator/CreateRoom";
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
