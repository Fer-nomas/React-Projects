import React, { useEffect, useState } from "react";

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const { clientY, clientX } = e;
      setPosition({ x: clientX, y: clientY });
    };

    if (enabled) {
      window.addEventListener("pointermove", handleMove);
    }

    return () => {
      //clean up event listener when component unmounts or changes props
      window.removeEventListener("pointermove", handleMove);
    };
  }, [enabled]);

  const style = {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    boxShadow: "0px 0px 10px black",
    borderRadius: "50%",
    opacity: 0.1,
    pointerEvents: "none",
    left: -100,
    top: -100,
    width: 200,
    height: 200,
    transform: `translate(${position.x}px, ${position.y}px)`,
  };
  const nostyle = {
    display: "none",
  };
  return (
    <>
      <div style={enabled ? style : nostyle} />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? "Desactivar" : "Activar"} seguir puntero
      </button>
    </>
  );
};

function App() {
  return (
    <main
      style={{
        overflow: "none",
      }}
    >
      <FollowMouse />
    </main>
  );
}

export default App;
