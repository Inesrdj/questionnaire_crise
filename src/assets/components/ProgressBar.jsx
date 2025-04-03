import { useLocation } from "react-router-dom";

const steps = [
  { label: "Consentement", path: "/" },
  { label: "Code", path: "/setup" },
  { label: "Think Aloud", path: "/thinkaloud" },
  { label: "STAI Pré", path: "/stai-pre" },
  { label: "Immersion", path: "/immersion" },
  { label: "STAI Post", path: "/stai-post" },
  { label: "Présence", path: "/presence" },
  { label: "Manipulation", path: "/manipulation" },
  { label: "Émotions", path: "/emotion" },
  { label: "Socio-démo", path: "/sociodemographics" },
  { label: "Fin", path: "/end" },
];

export default function ProgressBar() {
  const location = useLocation();

  const currentIndex = steps.findIndex((step) => step.path === location.pathname);
  const progressPercent = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div style={{
      position: "relative",
      marginTop: "0rem",         // ↘︎ décalage vers le bas
      padding: "1rem 2rem",
      backgroundColor: "#ffffff"
    }}>
      <div style={{
        height: "16px",           // ↗︎ plus épais
        width: "100%",
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${progressPercent}%`,
          backgroundColor: "#3f51b5",
          transition: "width 0.4s ease",
        }} />
      </div>

      <div style={{
        textAlign: "center",
        fontSize: "0.95rem",
        marginTop: "0.7rem",
        fontWeight: "500",
        color: "#444"
      }}>
      </div>
    </div>
  );
}
