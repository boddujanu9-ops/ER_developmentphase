import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface Patient {
  name: string;
  score: number;
  priority: string;
  time: string | Date;
  emergency?: boolean;
}

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [clock, setClock] = useState(new Date().toLocaleString());
  const [, navigate] = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("patients");
    setPatients(stored ? JSON.parse(stored) : []);
    const interval = setInterval(() => setClock(new Date().toLocaleString()), 1000);
    return () => clearInterval(interval);
  }, []);

  const critical = patients.filter((p) => p.priority && p.priority.includes("P1")).length;

  function emergencySOS() {
    const emergencyPatient: Patient = {
      name: "Emergency Case",
      score: 10,
      priority: "P1 Critical",
      time: new Date().toISOString(),
      emergency: true,
    };
    const existing = JSON.parse(localStorage.getItem("patients") || "[]");
    existing.unshift(emergencyPatient);
    localStorage.setItem("patients", JSON.stringify(existing));
    alert("🚨 Emergency Patient Added!");
    navigate("/queue");
  }

  return (
    <div className="main">

      {/* WEBSITE HEADER */}
      <div className="site-header">
        <img src="/logo.png" alt="ER Triage Logo" className="site-logo" />
        <span className="site-title">ER Triage Intelligence System</span>
      </div>

      <div className="top-bar">
        <div>
          <strong>🏥 Hospital ER System</strong>
          <br />
          <span className="sub-text">Emergency Monitoring Active</span>
        </div>
        <div className="clock-area">
          <strong>{clock}</strong>
          <br />
          <span className="sub-text">System Time</span>
        </div>
      </div>

      <h1>👨‍⚕️ Emergency Control Dashboard</h1>

      <div className="welcome">
        Welcome Doctor! This system monitors ER triage priority, patient inflow, and emergency
        alerts to help doctors respond faster.
      </div>

      <button className="btn-danger" onClick={emergencySOS}>
        🚨 Emergency SOS
      </button>

      <div className="cards">
        <div className="stat-card blue">
          <h3>Total Patients</h3>
          <p>{patients.length}</p>
        </div>
        <div className="stat-card red">
          <h3>Critical Cases</h3>
          <p>{critical}</p>
        </div>
        <div className="stat-card green">
          <h3>System Status</h3>
          <p>Operational ✅</p>
        </div>
      </div>

      <div className="info-box dashboard-box">
        <h2>📊 ER Monitoring Overview</h2>
        <p>The ER Triage System continuously evaluates patient severity using clinical indicators
        such as heart rate, oxygen saturation, temperature, risk factors, and symptom urgency.</p>
        <p>Patients are automatically prioritized to ensure that life-threatening conditions receive
        immediate medical attention while maintaining efficient patient flow inside the emergency
        department.</p>
        <hr />
        <h3>⚡ System Highlights</h3>
        <ul>
          <li>✔ Real-time patient prioritization</li>
          <li>✔ Emergency override (SOS)</li>
          <li>✔ Smart waiting-time estimation</li>
          <li>✔ Automated severity classification</li>
          <li>✔ Doctor workflow optimization</li>
        </ul>
      </div>

      <div className="info-box dashboard-box">
        <h2>🏥 Clinical Decision Support</h2>
        <p>This dashboard assists doctors by providing quick visibility into current emergency
        workload, critical patient count, and system health. The triage scoring model helps reduce
        manual assessment delays and supports faster clinical decisions.</p>
      </div>
    </div>
  );
}