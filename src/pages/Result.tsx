import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function Result() {
  const [, navigate] = useLocation();
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("latest");
    if (data) {
      setPatient(JSON.parse(data));
    }
  }, []);

  if (!patient) {
    return (
      <div className="main">
        <h2>No patient data found.</h2>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="container">

        <h1>🧾 Triage Result</h1>

        <div className="info-box">
          <h2>Patient Information</h2>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
        </div>

        <div className="info-box">
          <h2>Vitals</h2>
          <p><strong>Heart Rate:</strong> {patient.hr} bpm</p>
          <p><strong>Temperature:</strong> {patient.temp} °C</p>
          <p><strong>Oxygen Level:</strong> {patient.oxygen}%</p>
        </div>

        <div className="info-box">
          <h2>Symptoms</h2>
          <ul>
            {patient.symptoms.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="info-box">
          <h2>Triage Evaluation</h2>
          <p><strong>Total Score:</strong> {patient.score}</p>
          <p><strong>Priority Level:</strong> {patient.priority}</p>
          <p><strong>Severity:</strong> {patient.severity}</p>
        </div>

        <button
          className="submit-btn"
          onClick={() => navigate("/queue")}
        >
          View Patient Queue
        </button>

      </div>
    </div>
  );
}