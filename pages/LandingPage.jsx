import React from "react";
import dynamic from "next/dynamic";
// import Navbar from "@/components/reusables/Navbar";
const Navbar = React.lazy(() => import("@/components/reusables/Navbar"));
const Footer = React.lazy(() => import("@/components/reusables/Footer"));
// import Footer from "@/components/reusables/Footer";

// Dynamically import components with loading indicators
const Header = dynamic(() =>
  import("@/components/reusables/landingPage/Header")
);
const Main = dynamic(() => import("@/components/reusables/landingPage/Main"));
const FindConnect = dynamic(
  () => import("@/components/reusables/landingPage/FindConnect"),
  { ssr: false }
);
const Metrics = dynamic(() =>
  import("@/components/reusables/landingPage/Metrics")
);
const ProgramsOffered = dynamic(() =>
  import("@/components/reusables/landingPage/ProgramsOffered")
);
const OurPartner = dynamic(() =>
  import("@/components/reusables/landingPage/OurPartner")
);
const OurPrograms = dynamic(() =>
  import("@/components/reusables/landingPage/OurPrograms")
);
const JoinCommunity = dynamic(() =>
  import("@/components/reusables/landingPage/JoinCommunity")
);

const LandingPage = () => {
  return (
    <div>
      <React.Suspense>
        <Navbar />
      </React.Suspense>
      <Header />
      <section className="bg-gradient-to-b from-white via-gray-100 to-gray-300">
        <Main />
        <FindConnect />
        <div className="relative">
          <Metrics />
          <div className="absolute -top-5 left-0 right-0 h-20 bg-gradient-to-b from-primary/20 via-primary/40 to-transparent pointer-events-none"></div>
          <div className="absolute -bottom-5 left-0 right-0 h-20 bg-gradient-to-t from-primary/20 via-primary/40 to-transparent pointer-events-none"></div>
        </div>

        <ProgramsOffered />

        <OurPartner />
        <OurPrograms />
        <JoinCommunity />
      </section>

      <React.Suspense>
        <Footer />
      </React.Suspense>
    </div>
  );
};

export default LandingPage;
