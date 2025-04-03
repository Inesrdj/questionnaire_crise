import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProgressBar from "./assets/components/ProgressBar"; // ⬅️ Ajout ici


// Import des pages
import Consent from "./pages/Consent";
import ParticipantSetup from "./pages/ParticipantSetup";
import ThinkAloudIntro from "./pages/ThinkAloudIntro";
import STAIpre from "./pages/STAIpre";
import ImmersionIntro from "./pages/ImmersionIntro";
import STAIpost from "./pages/STAIpost";
import SocialPresence from "./pages/SocialPresence";
import ManipulationCheck from "./pages/ManipulationCheck";
import EmotionVAS from "./pages/EmotionVAS";
import Sociodemographics from "./pages/Sociodemographics";
import End from "./pages/End";

function App() {
  return (
    <BrowserRouter>
     <ProgressBar /> {/* ✅ Affichage permanent de la barre */}
      <Routes>
        <Route path="/" element={<Consent />} />
        <Route path="/setup" element={<ParticipantSetup />} />
        <Route path="/thinkaloud" element={<ThinkAloudIntro />} />
        <Route path="/stai-pre" element={<STAIpre />} />
        <Route path="/immersion" element={<ImmersionIntro />} />
        <Route path="/stai-post" element={<STAIpost />} />
        <Route path="/presence" element={<SocialPresence />} />
        <Route path="/manipulation" element={<ManipulationCheck />} />
        <Route path="/emotion" element={<EmotionVAS />} />
        <Route path="/sociodemographics" element={<Sociodemographics />} />
        <Route path="/end" element={<End />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
