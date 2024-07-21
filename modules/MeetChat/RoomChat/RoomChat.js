import ChatMain from "./ChatMain/ChatMain";
import UserInfo from "./UserInfo";
import styles from "../meetChat.module.scss";
import { useEffect } from "react";
import { auth } from "@/firebase.config";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { isIdUnique } from "@/components/utils";

const cookie = new Cookies();

const RoomChat = () => {
  const router = useRouter();

  const checkAuth = async () => {
    let isRoomUnique = await isIdUnique(router?.query?.["room-id"]);
    if (cookie?.get("auth-token")?.length === 0 || isRoomUnique) {
      router.push("/");
    }
  };
  useEffect(() => {
    if (router?.isReady) {
      checkAuth();
    }
  }, [router?.isReady]);

  return (
    <div className={styles.roomChatContainer}>
      <UserInfo />
      <ChatMain />
    </div>
  );
};

export default RoomChat;
