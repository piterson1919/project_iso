import React from "react";
import { RegisterButton, LoginButton } from "../components/bottons";
import "../style/main.css";

export default function Main() {
  return (
    <div className="main-background">
      <div className="main-panel">
        <h1 className="main-title">QMS FOOTSAFE</h1>
        <p className="main-subtitle">
          Accede a tu cuenta o regístrate para continuar
        </p>
        <div className="main-buttons">
          <RegisterButton />
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
