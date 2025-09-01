import React from "react";
import dynamic from "next/dynamic";
import OnScrollView from "@/components/reusables/Layout/OnScrollView";
// import Navbar from "@/components/reusables/Navbar";
const Navbar = React.lazy(() => import("@/components/reusables/Navbar"));
const Footer = React.lazy(() => import("@/components/reusables/Footer"));
// import Footer from "@/components/reusables/Footer";

// Dynamically import components with loading indicators
const Header = dynamic(() =>
  import("@/components/reusables/landingPage/Header")
);
const OurAlumni = dynamic(() =>
  import("@/components/reusables/landingPage/OurAlumni")
);
const Main = dynamic(() => import("@/components/reusables/landingPage/Main"));
const FindConnect = dynamic(() =>
  import("@/components/reusables/landingPage/FindConnect")
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

      <OnScrollView>
        <OurAlumni />
      </OnScrollView>
      <section className="bg-gradient-to-b from-white via-gray-100 to-gray-300">
        <OnScrollView>
          <Main />
        </OnScrollView>
        <OnScrollView>
          <FindConnect />
        </OnScrollView>
        <div className="relative">
          <OnScrollView>
            <Metrics />
          </OnScrollView>
          <div className="absolute -top-5 left-0 right-0 h-20 bg-gradient-to-b from-white via-primary/20 to-primary/40 pointer-events-none"></div>
          <div className="absolute -bottom-5 left-0 right-0 h-20 bg-gradient-to-t from-white via-primary/20 to-primary/40 pointer-events-none"></div>
        </div>

        <OnScrollView>
          <ProgramsOffered />
        </OnScrollView>
        <OnScrollView>
          <OurPartner />
        </OnScrollView>
        <OnScrollView>
          <OurPrograms />
        </OnScrollView>
        <OnScrollView>
          <JoinCommunity />
        </OnScrollView>
      </section>

      <React.Suspense>
        <Footer />
      </React.Suspense>
    </div>
  );
};

export default LandingPage;
