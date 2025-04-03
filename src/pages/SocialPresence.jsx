import { useState, useEffect } from "react";
import NextButton from "../assets/components/NextButton";
import { supabase } from "../supabase";
import CardContainer from "../assets/components/CardContainer";

const items = [
  {
    text: "J'ai perçu que j'étais en présence d'autres personnes dans la salle d'intervention",
    column: "presence_sociale_1"
  },
  {
    text: "J'ai senti que les personnes me regardaient et étaient conscientes de ma présence",
    column: "presence_sociale_2"
  },
  {
    text: "L'idée que les personnes n'étaient pas de vraies personnes m'a souvent traversé l'esprit",
    column: "presence_sociale_3"
  },
  {
    text: "Les personnes me semblaient être sensibles, conscientes et vivantes",
    column: "presence_sociale_4"
  },
  {
    text: "J'ai perçu les personnes comme étant seulement une image générée par ordinateur et non comme de vraies personnes",
    column: "presence_sociale_5"
  }
];

const options = [1, 2, 3, 4, 5, 6, 7];

export default function SocialPresence() {
  const [responses, setResponses] = useState({});
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

  const handleChange = (column, value) => {
    setResponses((prev) => ({ ...prev, [column]: value }));
  };

  const handleSubmit = async () => {
    const missing = items.some(({ column }) => responses[column] === undefined);
    if (missing) {
      setHighlightErrors(true);
      setError("Veuillez répondre à toutes les questions.");
      return false;
    }

    if (!codeAnonymat) {
      setError("Code d’anonymat manquant.");
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
    <h1 style={{ fontSize: "1.8rem", marginBottom: "0.3rem", marginTop: "0.3rem" }}>Votre ressenti sur l'expérience</h1>

    <p style={{ lineHeight: "1.3", marginBottom: "1.5rem" }}>

        Les propositions suivantes concerne l'expérience que vous venez de vivre dans le bloc opératoire en réalité virtuelle. Pour chaque affirmation ci-dessous, indiquez à quel point vous êtes d'accord avec celle-ci, de <strong>Pas du tout (1)</strong> à <strong>Tout à fait (7)</strong>.
      </p>

      {items.map(({ text, column }, index) => (
        <div
          key={index}
          style={{
            marginBottom: "0.5rem",
            padding: "0.25rem",
            border: highlightErrors && responses[column] === undefined ? "1px solid red" : "none",
            borderRadius: "5px"
          }}
        >
          <p><strong>{text}</strong></p>
          {<div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            {options.map((val) => (
              <div key={val} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "65px", whiteSpace: "nowrap" }}>
                <div style={{ fontSize: "1rem", marginBottom: "0.2rem" }}>
                  {val === 1 ? "Pas du tout" : val === 7 ? "Tout à fait" : val}
                </div>
                <input
                  type="radio"
                  name={column}
                  value={val}
                  checked={responses[column] === val}
                  onChange={() => handleChange(column, val)}
                />
              </div>
            ))}
          </div>}
        </div>
      ))}

      {error && <p style={{ color: "red", marginBottom: "0.5rem" }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NextButton to="/manipulation" onClick={handleSubmit} />
      </div>
    </CardContainer>
  );
}