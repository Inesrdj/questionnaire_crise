// src/pages/ManipulationCheck.jsx

import { useState, useEffect } from "react";
import NextButton from "../assets/components/NextButton";
import { supabase } from "../supabase";
import CardContainer from "../assets/components/CardContainer";

export default function ManipulationCheck() {
  const [gender, setGender] = useState("");
  const [emotion, setEmotion] = useState("");
  const [error, setError] = useState(null);
  const [codeAnonymat, setCodeAnonymat] = useState(null);

  useEffect(() => {
    const code = localStorage.getItem("code_anonymat");
    if (!code) {
      setError("Code d’anonymat introuvable.");
    } else {
      setCodeAnonymat(code);
    }
  }, []);

  const handleSubmit = async () => {
    if (!gender.trim() || !emotion.trim()) {
      setError("Veuillez répondre aux deux questions.");
      return false;
    }

    const { error: updateError } = await supabase
      .from("Reponse_questionnaire")
      .update({
        check_manip_gender: gender,
        check_manip_emotion: emotion
      })
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
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Avez-vous été attentif·ive ?</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <label>
          Quel était selon vous le genre du ou de la chirurgien·ne observé·e ?
          <input
            type="text"
            value={gender}
            placeholder="Ex : homme / femme"
            onChange={(e) => setGender(e.target.value)}
            style={{ display: "block", marginTop: "0.5rem", padding: "0.5rem", width: "100%" }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <label>
          Quelle émotion était exprimée par cette personne ?
          <input
            type="text"
            value={emotion}
            placeholder="Ex : joie / surprise / peur / dégout / colère  "
            onChange={(e) => setEmotion(e.target.value)}
            style={{ display: "block", marginTop: "0.5rem", padding: "0.5rem", width: "100%" }}
          />
        </label>
      </div>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NextButton to="/emotion" onClick={handleSubmit} />
      </div>
    </CardContainer>
  );
}
