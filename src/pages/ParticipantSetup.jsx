// src/pages/ParticipantSetup.jsx

import { useState } from "react";
import NextButton from "../assets/components/NextButton";
import { supabase } from "../supabase";
import CardContainer from "../assets/components/CardContainer";

export default function ParticipantSetup() {
  const [code, setCode] = useState("");
  const [chirGender, setChirGender] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError("Veuillez entrer un code d'anonymat.");
      return false;
    }

    if (!chirGender) {
      setError("L'expérimentateur doit choisir une modalité.");
      return false;
    }

    const { error: insertError } = await supabase
      .from("Reponse_questionnaire")
      .insert([{ 
        code_anonymat: code,
        chir_gender: chirGender
      }]);

    if (insertError) {
      console.error("Erreur Supabase :", insertError.message);
      setError("Une erreur est survenue, réessayez.");
      return false;
    }

    localStorage.setItem("code_anonymat", code);
    return true;
  };

  return (
    <CardContainer>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        Création du code d’anonymat
      </h1>

      <p style={{ marginBottom: "1.5rem", lineHeight: "1.6" }}>
        Merci de créer un code d’anonymat unique en suivant la consigne suivante :<br />
        <strong>
          Deuxième lettre de votre ville de naissance + jour de naissance (2 chiffres) + première lettre de votre prénom.
        </strong>
      </p>

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Ex : a14m"
        style={{
          padding: "10px",
          width: "250px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "1.5rem"
        }}
      />

      <div style={{ marginBottom: "1.5rem" }}>
        <p><strong>Modalité à choisir par l'expérimentateur :</strong></p>
        <select
          value={chirGender}
          onChange={(e) => setChirGender(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        >
          <option value="">-- Sélectionnez --</option>
          <option value="H">H</option>
          <option value="F">F</option>
        </select>
      </div>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <NextButton to="/thinkaloud" onClick={handleSubmit} />
      </div>
    </CardContainer>
  );
}