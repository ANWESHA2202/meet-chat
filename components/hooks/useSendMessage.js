import { auth, db } from "@/firebase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";

export const sendMessage = async ({ inputText, messageType, auth, roomId }) => {
  if (!roomId) {
    throw new Error("roomId is undefined");
  }
  const messagesRef = collection(db, "messages");
  await addDoc(messagesRef, {
    content: inputText,
    mediaUrl: "",
    createdAt: serverTimestamp(),
    user: auth.currentUser.displayName,
    authorizedBy: auth.currentUser.email,
    photoUrl: auth.currentUser.photoURL,
    roomId: roomId,
    messageType,
  });
};
export const useSendMessage = (callback = () => {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ inputText, messageType = 1, roomId = "" }) => {
      const id = router.query["room-id"];
      if (!id && !roomId) {
        throw new Error("roomId is undefined");
      }

      await sendMessage({
        inputText,
        messageType,
        auth,
        roomId: roomId?.length > 0 ? roomId : id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", router.query["room-id"]]);
      callback("");
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });
};
