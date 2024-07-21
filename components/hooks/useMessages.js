import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const [unsubscribe, setUnsubscribe] = useState(null);

  useEffect(() => {
    if (!roomId) return;

    const unsubscribe = fetchMessages(roomId, (messages) => {
      queryClient.setQueryData(["messages", roomId], messages);
    });

    setUnsubscribe(() => unsubscribe);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [roomId, queryClient]);

  return useQuery({
    queryKey: ["messages", roomId],
    queryFn: () => queryClient.getQueryData(["messages", roomId]) || [],
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    enabled: !!roomId,
  });
};
