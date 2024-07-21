"use client";
import MeetChat from "@/modules/MeetChat/MeetChat";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <MeetChat />
    </>
  );
}
