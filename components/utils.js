//write utility functions (ALPHABETICALLY SORTED)
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";

/**
 *
 * @param {Object} timeStamp server time stamp
 * @returns utc date string
 */
export function convertToUTC(timeStamp = { seconds: 0, nanoseconds: 0 }) {
  try {
    const { seconds, nanoseconds } = timeStamp;

    // Convert seconds to milliseconds
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;

    // Create a Date object
    const date = new Date(milliseconds);

    return date.toUTCString();
  } catch (err) {
    console.log(err);
  }
}

const generateSegment = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export const isInputTextValid = (text = "") => {
  return /\S/.test(text);
};

export const isIdUnique = async (id) => {
  const q = query(collection(db, "uniqueIds"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

const saveUniqueId = async (id, createdBy = "") => {
  await addDoc(collection(db, "uniqueIds"), { id, createdBy });
};

export const generateUniqueMeetChatLinkId = async (createdBy = "") => {
  let uniqueId;
  let isUnique = false;

  while (!isUnique) {
    const segment1 = generateSegment(3);
    const segment2 = generateSegment(4);
    const segment3 = generateSegment(3);
    uniqueId = `${segment1}-${segment2}-${segment3}`;

    isUnique = await isIdUnique(uniqueId);
  }

  await saveUniqueId(uniqueId, createdBy);
  return uniqueId;
};

/**
 *
 * @param {String} dateString date-time from server time stamp
 * @returns {string} in a human readable date format
 */
export const formatDate = (dateString = "") => {
  const date = new Date(dateString);
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return `Today, ${date.toLocaleString("en-US", options)}`;
  } else if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday, ${date.toLocaleString("en-US", options)}`;
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow, ${date.toLocaleString("en-US", options)}`;
  } else {
    const fullDateOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", fullDateOptions);
  }
};
