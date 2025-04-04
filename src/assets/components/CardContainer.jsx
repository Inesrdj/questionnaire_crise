export default function CardContainer({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",    // garde la page au minimum égale au viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        className="card-container"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "2rem",
          maxWidth: "700px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {children}
      </div>
    </div>
  );
}
