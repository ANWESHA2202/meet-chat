// hooks/useMessages.js
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase.config";

export const fetchMessages = (roomId, callback) => {
  const messagesRef = collection(db, "messages");
  const q = query(
    messagesRef,
    where("roomId", "==", roomId),
    orderBy("createdAt")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    callback(messages);
  });

  return unsubscribe;
};

export const useMessages = (roomId) => {
  return useQuery({
    queryKey: ["messages", roomId],
    queryFn: () =>
      new Promise((resolve, reject) => {
        const unsubscribe = fetchMessages(roomId, resolve);
        return () => unsubscribe();
      }),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
