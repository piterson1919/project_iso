// Avatar.jsx
export default function Avatar({ username, size = 35 }) {
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "?";

    const parts = name.trim().split(" ").filter(Boolean);

    if (parts.length === 0) return "?";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

    return (
      parts[0].charAt(0).toUpperCase() +
      parts[1].charAt(0).toUpperCase()
    );
  };

  const initials = getInitials(username);

  const styles = {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor: "#ffffffff",
    color: "brown",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: size * 0.45,
    userSelect: "none",
  };

  return <div style={styles}>{initials}</div>;
}