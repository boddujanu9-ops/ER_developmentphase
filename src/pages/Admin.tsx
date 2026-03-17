import { useEffect, useState } from "react";

interface Patient {
  name: string;
  age?: number;
  gender?: string;
  score: number;
  priority: string;
  time: string | Date;
  emergency?: boolean;
  severity?: string;
  hr?: number;
  temp?: number;
  oxygen?: number;
}

export default function Admin() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("patients");
    setPatients(stored ? JSON.parse(stored) : []);
  }, []);

  const critical   = patients.filter((p) => p.priority?.includes("P1")).length;
  const veryUrgent = patients.filter((p) => p.priority?.includes("P2")).length;
  const urgent     = patients.filter((p) => p.priority?.includes("P3")).length;

  function clearAll() {
    if (window.confirm("Are you sure you want to clear all patient data?")) {
      localStorage.removeItem("patients");
      localStorage.removeItem("latest");
      localStorage.removeItem("severityLevel");
      setPatients([]);
    }
  }

  return (
    <div className="main">
      <h1>📊 Hospital Administration Panel</h1>

      <div className="info-box">
        <h2>📈 System Analytics</h2>
        <p>This dashboard provides a centralized overview of emergency department operations.
        Monitor patient inflow, severity trends, and hospital performance in real time.</p>
      </div>

      <div className="info-box">
        <h2>📊 Live Statistics</h2>
        <p><strong>Total Patients: {patients.length}</strong></p>
        <p><strong>Critical Cases: {critical}</strong></p>
        <p><strong>Very Urgent Cases: {veryUrgent}</strong></p>
        <p><strong>Urgent Cases: {urgent}</strong></p>
        <p><strong>Queue Length: {patients.length}</strong></p>
      </div>

      <div className="info-box">
        <h2>🏥 Hospital Administration Insights</h2>
        <p>The Administration Panel provides hospital management with real-time visibility into ER
        operations. Track patient volumes, severity distribution, and system utilization to optimize
        emergency department performance.</p>
        <hr />
        <h3>Priority Breakdown</h3>
        <div className="priority-breakdown">
          <div className="priority-item">
            <span className="badge badge-red">P1 Critical</span>
            <span>{critical}</span>
          </div>
          <div className="priority-item">
            <span className="badge badge-orange">P2 Emergency</span>
            <span>{veryUrgent}</span>
          </div>
          <div className="priority-item">
            <span className="badge badge-yellow">P3 Urgent</span>
            <span>{urgent}</span>
          </div>
          <div className="priority-item">
            <span className="badge badge-green">P4+ Non-Critical</span>
            <span>{patients.length - critical - veryUrgent - urgent}</span>
          </div>
        </div>
      </div>

      <div className="info-box">
        <h2>⚙️ System Controls</h2>
        <p>Use with caution. These actions affect all patient data.</p>
        <button className="btn-danger" onClick={clearAll}>
          🗑️ Clear All Patient Data
        </button>
      </div>

      {patients.length > 0 && (
        <div className="info-box">
          <h2>📋 All Registered Patients</h2>
          <div className="table-wrapper">
            <table className="queue-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Score</th>
                  <th>Priority</th>
                  <th>Severity</th>
                  <th>HR</th>
                  <th>Temp</th>
                  <th>O₂</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.age ?? "—"}</td>
                    <td>{p.gender ?? "—"}</td>
                    <td>{p.score}</td>
                    <td>
                      <span className={`badge ${
                        p.priority?.includes("P1") ? "badge-red"
                        : p.priority?.includes("P2") ? "badge-orange"
                        : p.priority?.includes("P3") ? "badge-yellow"
                        : "badge-green"
                      }`}>
                        {p.priority}
                      </span>
                    </td>
                    <td>{p.severity ?? "—"}</td>
                    <td>{p.hr ?? "—"}</td>
                    <td>{p.temp ?? "—"}</td>
                    <td>{p.oxygen ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}