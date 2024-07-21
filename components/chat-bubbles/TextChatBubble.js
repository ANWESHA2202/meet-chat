import React from "react";
import styles from "./chatbubbles.module.scss";
import { auth } from "@/firebase.config";
import { convertToUTC, formatDate } from "../utils";
import moment from "moment";

const TextChatBubble = ({ message }) => {
  let isReceiver = auth?.currentUser?.email !== message?.authorizedBy;
  console.log(message.createdAt);
  return (
    <div className={styles.chatContainer}>
      <div
        className={`${styles.chatBubble} ${
          !isReceiver ? styles.sent : styles.received
        }`}
      >
        <span className={styles.title}>
          {isReceiver ? auth?.currentUser?.displayName : "You"}
        </span>
        <span>{message?.content}</span>
        <p className={styles.timeStamp}>
          {formatDate(moment(convertToUTC(message?.createdAt)))}
        </p>
      </div>
    </div>
  );
};

export default TextChatBubble;
