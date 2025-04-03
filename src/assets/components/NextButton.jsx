import { useNavigate } from "react-router-dom";

export default function NextButton({ to, disabled, onClick }) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (onClick) {
      const result = await onClick();
      if (result === false) return; // empêche la navigation si onClick retourne false
    }
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      Suivant
    </button>
  );
}
