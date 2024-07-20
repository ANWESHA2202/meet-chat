import { useRouter } from "next/router";

const MeetChatRoom = () => {
  const router = useRouter();
  return <div>{router.query["room-id"]}</div>;
};

export default MeetChatRoom;
