import Auth from "./Auth";
import Cookies from "universal-cookie";
import JoinRoom from "./JoinRoom";

const cookie = new Cookies();

const MeetChat = () => {
  return (
    <div>{cookie.get("auth-token")?.length ? <JoinRoom /> : <Auth />}</div>
  );
};

export default MeetChat;
