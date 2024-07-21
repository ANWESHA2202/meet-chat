import { useMessages } from "@/components/hooks/useMessages";
import { useRouter } from "next/router";

const Messages = () => {
  const router = useRouter();
  const {
    data: messages,
    error,
    isLoading,
  } = useMessages(router.query["room-id"]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading messages</div>;
  return <div></div>;
};

export default Messages;
