import { useEffect, useState } from "react";
import CardContainer from "../assets/components/CardContainer";
import NextButton from "../assets/components/NextButton";
import { supabase } from "../supabase";

export default function Sociodemographics() {
  const [formData, setFormData] = useState({
    genre: "",
    autre_genre: "",
    age: "",
    annee_ibode: "",
    role_bloc: [],
    autre_role: "",
    utilisation_vr: "",
    precisions_vr: "",
    jeux_video: "",
    frequence_jeux_video: "",
  });

  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [codeAnonymat, setCodeAnonymat] = useState(null);

  useEffect(() => {
    const code = localStorage.getItem("code_anonymat");
    if (!code) {
      setError("Code d’anonymat introuvable.");
    } else {
      setCodeAnonymat(code);
    }
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (value) => {
    setFormData((prev) => {
      const current = prev.role_bloc;
      if (current.includes(value)) {
        return { ...prev, role_bloc: current.filter((r) => r !== value) };
      } else {
        return { ...prev, role_bloc: [...current, value] };
      }
    });
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    const requiredFields = [
      "genre",
      "age",
      "annee_ibode",
      "utilisation_vr",
      "jeux_video",
    ];
    const isValid =
      requiredFields.every((field) => formData[field].trim() !== "") &&
      formData.role_bloc.length > 0;

    if (!isValid) {
      setError("Merci de compléter tous les champs obligatoires.");
      return false;
    }

    const genreFinal =
      formData.genre === "autre" ? formData.autre_genre : formData.genre;
    const roleFinal = [...formData.role_bloc];
    if (roleFinal.includes("autre")) {
      const index = roleFinal.indexOf("autre");
      if (index > -1) {
        roleFinal[index] = formData.autre_role;
      }
    }

    const { error: updateError } = await supabase
      .from("Reponse_questionnaire")
      .update({
        genre: genreFinal,
        age: formData.age,
        annee_ibode: formData.annee_ibode,
        role_bloc: roleFinal.join(", "),
        utilisation_vr: formData.utilisation_vr,
        precisions_vr: formData.precisions_vr,
        jeux_video: formData.jeux_video,
        frequence_jeux_video: formData.frequence_jeux_video,
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
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        Informations sociodémographiques
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        <label>
          Genre :
          <select
            value={formData.genre}
            onChange={(e) => handleChange("genre", e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
          >
            <option value="">-- Sélectionnez --</option>
            <option value="femme">Femme</option>
            <option value="homme">Homme</option>
            <option value="non binaire">Non binaire</option>
            <option value="autre">Autre</option>
          </select>
        </label>

        {formData.genre === "autre" && (
          <input
            type="text"
            placeholder="Précisez votre genre"
            value={formData.autre_genre}
            onChange={(e) => handleChange("autre_genre", e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        )}

        <label>
          Âge :
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            placeholder="Ex : 25"
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
          />
        </label>

        <label>
          Année de formation IBODE :
          <select
            value={formData.annee_ibode}
            onChange={(e) => handleChange("annee_ibode", e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
          >
            <option value="">-- Sélectionnez --</option>
            <option value="1re année">1re année</option>
            <option value="2e année">2e année</option>
          </select>
        </label>

        <div>
          <label>Quel rôle avez-vous déjà eu au bloc opératoire ?</label>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "0.5rem" }}>
            {["circulante", "instrumentiste", "assistant chirurgical", "autre"].map((role) => (
              <label key={role}>
                <input
                  type="checkbox"
                  checked={formData.role_bloc.includes(role)}
                  onChange={() => handleCheckboxChange(role)}
                  style={{ marginRight: "0.5rem" }}
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>
          {formData.role_bloc.includes("autre") && (
            <input
              type="text"
              placeholder="Précisez votre rôle"
              value={formData.autre_role}
              onChange={(e) => handleChange("autre_role", e.target.value)}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
            />
          )}
        </div>

        <label>
          Avez-vous déjà utilisé la réalité virtuelle ?
          <select
            value={formData.utilisation_vr}
            onChange={(e) => handleChange("utilisation_vr", e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
          >
            <option value="">-- Sélectionnez --</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
        </label>

        {formData.utilisation_vr === "oui" && (
          <input
            type="text"
            placeholder="Dans quel cadre ?"
            value={formData.precisions_vr}
            onChange={(e) => handleChange("precisions_vr", e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        )}

        <label>
          Jouez-vous aux jeux vidéo ?
          <select
            value={formData.jeux_video}
            onChange={(e) => handleChange("jeux_video", e.target.value)}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
          >
            <option value="">-- Sélectionnez --</option>
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
        </label>

        {formData.jeux_video === "oui" && (
          <input
            type="text"
            placeholder="Fréquence ? (ex : tous les jours)"
            value={formData.frequence_jeux_video}
            onChange={(e) => handleChange("frequence_jeux_video", e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        )}

        {error && (
          <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
        <NextButton to="/end" onClick={handleSubmit} />
      </div>
    </CardContainer>
  );
}
