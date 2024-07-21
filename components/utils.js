//write utility functions (ALPHABETICALLY SORTED)
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";

const generateSegment = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export const isIdUnique = async (id) => {
  const q = query(collection(db, "uniqueIds"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

const saveUniqueId = async (id) => {
  await addDoc(collection(db, "uniqueIds"), { id });
};

export const generateUniqueMeetChatLinkId = async () => {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    const segment1 = generateSegment(3);
    const segment2 = generateSegment(4);
    const segment3 = generateSegment(3);
    uniqueId = `${segment1}-${segment2}-${segment3}`;

    isUnique = await isIdUnique(uniqueId);
  }

  await saveUniqueId(uniqueId);
  return uniqueId;
};
