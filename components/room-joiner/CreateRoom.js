import { useMutation } from "@tanstack/react-query";
import { generateUniqueMeetChatLinkId } from "../utils";
import { useState } from "react";
import { useRouter } from "next/router";

const CreateRoom = () => {
  const router = useRouter();
  const [uniqueId, setUniqueId] = useState("");

  const regenerateIdMutation = useMutation({
    mutationFn: generateUniqueMeetChatLinkId,
    onSuccess: (data) => {
      setUniqueId(data);
      router.push(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const regenerateId = () => {
    regenerateIdMutation.mutate();
  };
  return (
    <>
      <h1>Your unique Meet-like ID: {uniqueId}</h1>
      <button onClick={regenerateId}>Generate New ID</button>
    </>
  );
};

export default CreateRoom;
