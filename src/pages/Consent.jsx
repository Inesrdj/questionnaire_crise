import { useState } from "react";
import NextButton from "../assets/components/NextButton";
import CardContainer from "../assets/components/CardContainer";

export default function Consent() {
  const [checked, setChecked] = useState(false);

  return (
    <CardContainer>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        Consentement éclairé
      </h1>

      <p style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
        Merci de participer à cette étude. Après avoir lu attentivement la feuille de consentement fournie par l'expérimentateur, donnez votre accord en cochant la case ci-dessous.
      </p>

      <label style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          style={{ marginRight: "0.5rem" }}
        />
        J’ai lu et compris les informations, et je consens à participer.
      </label>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NextButton to="/setup" disabled={!checked} />
      </div>
    </CardContainer>
  );
}
