import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { isIdUnique } from "../utils";

export const useJoinRoom = (setInputError, setIsLoading) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (roomId) => {
      const isUnique = await isIdUnique(roomId);
      return isUnique;
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (isUnique, roomId) => {
      if (!isUnique) {
        router.push(roomId);
      } else {
        setInputError("Room doesn't exist!");
      }
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      console.error(error);
      setInputError("An error occurred while joining the room.");
    },
  });
};
