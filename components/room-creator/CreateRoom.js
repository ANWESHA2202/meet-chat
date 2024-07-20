import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { generateUniqueMeetChatLinkId } from "../utils";

const fetchUniqueId = async () => {
  return await generateUniqueMeetChatLinkId();
};
const CreateRoom = () => {
  const queryClient = useQueryClient();

  const { data: uniqueId, refetch } = useQuery({
    queryKey: ["uniqueId"],
    queryFn: fetchUniqueId,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const regenerateIdMutation = useMutation({
    mutationFn: fetchUniqueId,
    onSuccess: (data) => {
      queryClient.setQueryData(["uniqueId"], data);
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const regenerateId = () => {
    regenerateIdMutation.mutate();
  };
  return (
    <div>
      <h1>Your unique Meet-like ID: {uniqueId}</h1>
      <button onClick={regenerateId}>Generate New ID</button>
    </div>
  );
};

export default CreateRoom;
