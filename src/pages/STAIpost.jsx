// src/pages/STAIpost.jsx

import { useState, useEffect } from "react";
import NextButton from "../assets/components/NextButton";
import { supabase } from "../supabase";
import CardContainer from "../assets/components/CardContainer";

const items = [
  "Je me sens calme",
  "Je me sens tendu(e)",
  "Je me sens ému(e), bouleversé(e)",
  "Je me sens détendu(e)",
  "Je me sens satisfait(e)",
  "Je me sens inquiet(e)"
];

const options = [
  { label: "Pas du tout", value: 1 },
  { label: "Un peu", value: 2 },
  { label: "Modérément", value: 3 },
  { label: "Beaucoup", value: 4 }
];

export default function STAIpost() {
  const [responses, setResponses] = useState(Array(6).fill(null));
  const [error, setError] = useState(null);
  const [codeAnonymat, setCodeAnonymat] = useState(null);
  const [highlightErrors, setHighlightErrors] = useState(false);

  useEffect(() => {
    const code = localStorage.getItem("code_anonymat");
    if (!code) {
      setError("Code d’anonymat introuvable.");
    } else {
      setCodeAnonymat(code);
    }
  }, []);

  const handleChange = (itemIndex, value) => {
    const updated = [...responses];
    updated[itemIndex] = value;
    setResponses(updated);
  };

  const handleSubmit = async () => {
    if (responses.some((r) => r === null)) {
      setHighlightErrors(true);
      setError("Veuillez répondre à toutes les questions.");
      return false;
    }

    if (!codeAnonymat) {
      setError("Code d’anonymat manquant.");
      return false;
    }

    const updateData = {};
    responses.forEach((val, idx) => {
      updateData[`stai_post_${idx + 1}`] = val;
    });

    const { error: updateError } = await supabase
      .from("Reponse_questionnaire")
      .update(updateData)
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
      <h1 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
        Votre état émotionnel
      </h1>

      <p style={{ marginBottom: "0.1rem", lineHeight: "1.5" }}>
      Veuillez indiquer <strong> dans quelle mesure chaque proposition correspond à ce que vous ressentez à l'instant, juste en ce moment</strong>. Il n'y a pas de bonne ou de mauvaise réponse. Ne passez pas trop de temps sur chaque proposition.
      </p>

      {items.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "0.5rem",
            padding: "0.25rem",
            border: highlightErrors && responses[index] === null ? "1px solid red" : "none",
            borderRadius: "5px"
          }}
        >
          <p><strong>{item}</strong></p>
          {options.map((option) => (
            <label key={option.value} style={{ marginRight: "15px" }}>
              <input
                type="radio"
                name={`item-${index}`}
                value={option.value}
                checked={responses[index] === option.value}
                onChange={() => handleChange(index, option.value)}
              />
              {" "}{option.label}
            </label>
          ))}
        </div>
      ))}

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NextButton to="/presence" onClick={handleSubmit} />
      </div>
    </CardContainer>
  );
}

