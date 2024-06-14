import Footer from "@/components/reusables/Footer";
import Header from "@/components/reusables/landingPage/Header";
import FindConnect from "@/components/reusables/landingPage/FindConnect";
import Metrics from "@/components/reusables/landingPage/Metrics";
import Main from "@/components/reusables/landingPage/Main";
import Navbar from "@/components/reusables/Navbar";
import ProgramsOffered from "@/components/reusables/landingPage/ProgramsOffered";
import OurPartner from "@/components/reusables/landingPage/OurPartner";
import OurPrograms from "@/components/reusables/landingPage/OurPrograms";
import JoinCommunity from "@/components/reusables/landingPage/JoinCommunity";

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
