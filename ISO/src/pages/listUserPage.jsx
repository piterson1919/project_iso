"use client";

import React from "react";
import UserCards from "../components/list_user"; 

export default function Page () {
  return (
    <main className="page-container">
      
      <header className="page-header">
        <h1 className="page-title">Usuarios</h1>
        <p className="page-subtitle">
          Lista de usuarios registrados en el sistema
        </p>
      </header>

      <section className="page-content">
        <UserCards />
      </section>

    </main>
  );
};