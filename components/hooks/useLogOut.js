import { auth, db } from "@/firebase.config";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const logout = async () => {
  signOut(auth);
  cookie.remove("auth-token");
};

const deleteMessagesDoc = async (roomId) => {
  await fetchMessageDocId(roomId, async (messageDocId) => {
    if (messageDocId?.length > 0) {
      const docRef = doc(db, "messages", messageDocId);
      await deleteDoc(docRef);
      logout();
    }
  });
};

async function fetchMessageDocId(roomId, callback) {
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, where("roomId", "==", roomId));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(messages);
    callback(messages?.[0]?.id);
  });

  return unsubscribe;
}

const findRoomCreator = async (roomId, callback) => {
  const roomsRef = collection(db, "uniqueIds");
  const q = query(roomsRef, where("id", "==", roomId));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const roomData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    callback(roomData);
  });

  return unsubscribe;
};
const handleLogout = async (roomId) => {
  let currentUser = auth?.currentUser?.email;
  if (roomId?.length > 0) {
    await findRoomCreator(roomId, async (roomData) => {
      if (roomData?.[0]?.createdBy === currentUser) {
        await deleteMessagesDoc(roomId);
      } else {
        await logout();
      }
    });
  } else {
    await logout();
  }
};

export const useLogOut = (roomId) => {
  const router = useRouter();
  return useMutation({
    mutationFn: (roomId) => handleLogout(roomId),
    onMutate: () => {
      //   setIsLoading(true);
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error(error);
      //   setInputError("An error occurred while joining the room.");
    },
  });
};
