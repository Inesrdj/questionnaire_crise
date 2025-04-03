import { useState } from "react";
import NextButton from "../assets/components/NextButton";
import CardContainer from "../assets/components/CardContainer";

export default function ImmersionIntro() {
  const [checked, setChecked] = useState(false);

  return (
    <CardContainer>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Avant de continuer</h1>

      <p style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
        <strong>Veuillez indiquer à l'expérimentateur que vous avez terminé de répondre aux premières questions. </strong><br/>
        Vous allez découvrir le bloc opératoire virtuel. 
        Après l'immersion, veuillez confirmer que vous êtes prêt·e à continuer en cochant la case ci-dessous.
      </p>

      <label style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          style={{ marginRight: "0.5rem" }}
        />
        Oui, je suis prêt·e à continuer.
      </label>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NextButton to="/stai-post" disabled={!checked} />
      </div>
    </CardContainer>
  );
}
