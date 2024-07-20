import { useMessages } from "@/components/hooks/useMessages";
import { db } from "@/firebase.config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Messages = () => {
  const router = useRouter();
  const messageRef = collection(db, "messages");
  const {
    data: messages,
    error,
    isLoading,
  } = useMessages(router.query["room-id"]);
  console.log(messages);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading messages</div>;
  return <div></div>;
};

export default Messages;
