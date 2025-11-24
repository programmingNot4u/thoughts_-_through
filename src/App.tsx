import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Media from "./pages/Media";
import MediaCoverageDetails from "./pages/MediaCoverageDetails";
import MediaCoverageList from "./pages/MediaCoverageList";
import PublicationsPage from "./pages/Publications";
import RelevantLinksList from "./pages/RelevantLinksList";
import ResearchAreas from "./pages/ResearchAreas";
import ResearchClimateDetails from "./pages/ResearchClimateDetails";
import ResearchClimateList from "./pages/ResearchClimateList";
import ResearchHealthDetails from "./pages/ResearchHealthDetails";
import ResearchHealthList from "./pages/ResearchHealthList";
import ResearchInequalityDetails from "./pages/ResearchInequalityDetails";
import ResearchInequalityList from "./pages/ResearchInequalityList";
import ResourcePanelPage from "./pages/ResourcePanel";
import SurveyDetails from "./pages/SurveyDetails";
import Surveys from "./pages/Surveys";
import WebinarDetails from "./pages/WebinarDetails";
import Webinars from "./pages/Webinars";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/research-areas" element={<ResearchAreas />} />
        <Route path="/surveys" element={<Surveys />} />
        <Route path="/surveys/:id" element={<SurveyDetails />} />
        <Route path="/research/health" element={<ResearchHealthList />} />
        <Route path="/research/health/:id" element={<ResearchHealthDetails />} />
        <Route path="/research/climate" element={<ResearchClimateList />} />
        <Route path="/research/climate/:id" element={<ResearchClimateDetails />} />
        <Route path="/research/social" element={<ResearchInequalityList />} />
        <Route path="/research/social/:id" element={<ResearchInequalityDetails />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/resource-panel" element={<ResourcePanelPage />} />
        <Route path="/media" element={<Media />} />
        <Route path="/media-coverage" element={<MediaCoverageList />} />
        <Route path="/media-coverage/:id" element={<MediaCoverageDetails />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/webinars/:id" element={<WebinarDetails />} />
        <Route path="/relevant-links" element={<RelevantLinksList />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
