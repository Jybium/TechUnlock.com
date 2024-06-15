import dynamic from "next/dynamic";
import Navbar from "@/components/reusables/Navbar";
import Footer from "@/components/reusables/Footer";

// Dynamically import components with loading indicators
const Header = dynamic(
  () => import("@/components/reusables/landingPage/Header"),
  { ssr: false }
);
const Main = dynamic(() => import("@/components/reusables/landingPage/Main"), {
  ssr: false,
});
const FindConnect = dynamic(
  () => import("@/components/reusables/landingPage/FindConnect"),
  { ssr: false }
);
const Metrics = dynamic(
  () => import("@/components/reusables/landingPage/Metrics"),
  { ssr: false }
);
const ProgramsOffered = dynamic(
  () => import("@/components/reusables/landingPage/ProgramsOffered"),
  { ssr: false }
);
const OurPartner = dynamic(
  () => import("@/components/reusables/landingPage/OurPartner"),
  { ssr: false }
);
const OurPrograms = dynamic(
  () => import("@/components/reusables/landingPage/OurPrograms"),
  { ssr: false }
);
const JoinCommunity = dynamic(
  () => import("@/components/reusables/landingPage/JoinCommunity"),
  { ssr: false }
);

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <section className="bg-gradient-to-b from-white via-gray-100 to-gray-300">
        <Main />
        <FindConnect />
        <Metrics />
        <ProgramsOffered />
        <OurPartner />
        <OurPrograms />
        <JoinCommunity />
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
