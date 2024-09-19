import Image from "next/image";
import LandingPage from "@/page/LandingPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LandingPage />
    </main>
  );
}
