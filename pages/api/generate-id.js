import { generateUniqueMeetChatLinkId } from "@/utils/generateMeetLinkId";

export default async function handler(req, res) {
  const uniqueId = await generateUniqueMeetChatLinkId();
  res.status(200).json({ id: uniqueId });
}
