"use client"
import Image from "next/image";
import Header from "./components/Header";
import BottomMenu from "./components/BottomMenu";

export default function Home() {
  return (
    <>
    <Header/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="relative z-[-1] flex place-items-center">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
    <BottomMenu/>
    </>
  );
}
