import Footer from "@/components/reusables/Footer";
import Header from "@/components/reusables/Header";
import FindConnect from "@/components/reusables/landingPage/FindConnect";
import Metrics from "@/components/reusables/landingPage/Metrics";
import Main from "@/components/reusables/Main";
import Navbar from "@/components/reusables/Navbar";

const LandingPage =
  () => {
    return (
      <div>
        <Navbar />
        <Header />
        <Main />
        <FindConnect/>
        <Metrics/>
        <Footer />
      </div>
    );
  };

export default LandingPage;
