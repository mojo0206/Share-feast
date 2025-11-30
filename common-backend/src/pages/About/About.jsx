import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>About ShareFeast</h1>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to bridge the gap between food surplus and those in need, empowering restaurants, hotels, and bakeries to donate excess food efficiently while reducing environmental impact and strengthening community bonds.
        </p>
      </section>

      <section className="vision">
        <h2>Our Vision</h2>
        <p>
          We envision a world where no surplus food goes to waste, where technology seamlessly connects providers with volunteers and NGOs, and where every meal donated contributes to a healthier planet and a more equitable society.
        </p>
      </section>

      <section className="team">
        <h2>Our Team</h2>
        <p>Rojashree B~Sanjhana B~Rachana R</p>
      </section>
    </div>
  );
}
