import { useState } from "react";
import NextButton from "../assets/components/NextButton";
import CardContainer from "../assets/components/CardContainer";

export default function ThinkAloudIntro() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <CardContainer>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Consigne de la pensée à voix haute</h1>

      <p style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
        L'expérimentateur va vous expliquer la procédure de pensée à voix haute. Après ces explications, veuillez cocher la case ci-dessous pour confirmer que vous avez compris les consignes, avant de poursuivre.
      </p>

      <div style={{ marginBottom: "2rem" }}>
        <label style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            style={{ marginRight: "0.5rem" }}
          />
          Oui, j’ai compris la consigne.
        </label>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NextButton to="/stai-pre" disabled={!isChecked} />
      </div>
    </CardContainer>
  );
}
