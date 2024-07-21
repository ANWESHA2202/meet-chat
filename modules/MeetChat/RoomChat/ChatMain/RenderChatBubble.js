import SystemChatBubble from "@/components/chat-bubbles/SystemChatBubble";
import TextChatBubble from "@/components/chat-bubbles/TextChatBubble";
import { auth } from "@/firebase.config";

const RenderChatBubble = ({ message }) => {
  let isReceiver = auth?.currentUser?.email !== message?.authorizedBy;
  const renderChatBubble = () => {
    switch (message?.messageType) {
      case 9: {
        return <SystemChatBubble message={message} />;
      }
      default: {
        return <TextChatBubble message={message} />;
      }
    }
  };
  return <div>{renderChatBubble()}</div>;
};

export default RenderChatBubble;
