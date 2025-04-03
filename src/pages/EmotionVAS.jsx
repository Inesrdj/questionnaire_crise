import { useState, useEffect } from "react";
import NextButton from "../assets/components/NextButton";
import CardContainer from "../assets/components/CardContainer";
import { supabase } from "../supabase";

const originalItems = [
  { label: "chaleureux·se", column: "biais_1" },
  { label: "compétent·e", column: "biais_2" },
  { label: "confiant·e", column: "biais_3" },
  { label: "digne de confiance", column: "biais_4" },
  { label: "amical·e", column: "biais_5" },
  { label: "efficace", column: "biais_6" }
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function EmotionVAS() {
  const [items, setItems] = useState([]);
  const [responses, setResponses] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [codeAnonymat, setCodeAnonymat] = useState(null);

  useEffect(() => {
    // Shuffle items on mount
    const shuffled = shuffleArray(originalItems);
    setItems(shuffled);

    // Init values
    const initialResponses = {};
    const initialTouched = {};
    shuffled.forEach(({ column }) => {
      initialResponses[column] = 50;
      initialTouched[column] = false;
    });
    setResponses(initialResponses);
    setTouched(initialTouched);

    const code = localStorage.getItem("code_anonymat");
    if (!code) {
      setError("Code d’anonymat introuvable.");
    } else {
      setCodeAnonymat(code);
    }
  }, []);

  const handleChange = (column, value) => {
    setResponses((prev) => ({ ...prev, [column]: parseInt(value) }));
    setTouched((prev) => ({ ...prev, [column]: true }));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const allTouched = items.every(({ column }) => touched[column]);

    if (!allTouched) {
      setError("Veuillez compléter toutes les échelles.");
      return false;
    }

    const { error: updateError } = await supabase
      .from("Reponse_questionnaire")
      .update(responses)
      .eq("code_anonymat", codeAnonymat);

    if (updateError) {
      console.error("Erreur Supabase :", updateError.message);
      setError("Une erreur est survenue, réessayez.");
      return false;
    }

    return true;
  };

  return (
    <CardContainer>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        Votre perception du·de la chirurgien·ne
      </h1>
      <p style={{ marginBottom: "2rem", lineHeight: "1.6" }}>
        Veuillez positionner les curseurs pour indiquer dans quelle mesure chaque caractéristique décrit l'individu, sur une échelle allant de <strong>"Pas du tout" à "Tout à fait"</strong>.
      </p>

      {items.map(({ label, column }) => (
        <div key={column} style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontWeight: "bold", marginBottom: "0.5rem", textAlign: "center" }}>
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </p>

          <div style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "center" }}>
            <span style={{ width: "100px", textAlign: "left", fontSize: "0.85rem", color: "#555" }}>Pas du tout</span>
            <input
              type="range"
              min={0}
              max={100}
              value={responses[column]}
              onChange={(e) => handleChange(column, e.target.value)}
              style={{
                width: "60%",
                appearance: "none",
                height: "6px",
                borderRadius: "5px",
                background: "#ddd",
                outline: "none",
                accentColor: "#333",
                border: !touched[column] && submitted ? "1px solid red" : "none",
                margin: "0 1rem"
              }}
            />
            <span style={{ width: "100px", textAlign: "right", fontSize: "0.85rem", color: "#555" }}>Tout à fait</span>
          </div>
        </div>
      ))}

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NextButton to="/sociodemographics" onClick={handleSubmit} />
      </div>
    </CardContainer>
  );
}
