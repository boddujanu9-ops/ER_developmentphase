import { useEffect, useState } from "react";

interface Patient {
  name: string;
  score: number;
  priority: string;
  time: string | Date;
  emergency?: boolean;
}

function priorityColor(priority: string): string {
  if (priority.includes("P1")) return "badge-red";
  if (priority.includes("P2")) return "badge-orange";
  if (priority.includes("P3")) return "badge-yellow";
  if (priority.includes("P4")) return "badge-green";
  return "badge-blue";
}

function sortPatients(patients: Patient[]): Patient[] {
  return [...patients].sort((a, b) => {
    if (a.emergency && !b.emergency) return -1;
    if (!a.emergency && b.emergency) return 1;
    return b.score - a.score;
  });
}

export default function Queue() {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("patients");
    setPatients(stored ? sortPatients(JSON.parse(stored)) : []);
  }, []);

  function removePatient(index: number) {
    const updated = [...patients];
    updated.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(updated));
    setPatients(sortPatients(updated));
  }

  return (
    <div className="main">
      <h2>Patient Queue</h2>

      {patients.length === 0 ? (
        <div className="welcome">No patients in queue. Register a patient to get started.</div>
      ) : (
        <div className="table-wrapper">
          <table className="queue-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
                <th>Priority</th>
                <th>Arrival Time</th>
                <th>Est. Wait</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, index) => (
                <tr key={index} className={p.emergency ? "emergency-row" : ""}>
                  <td>{index + 1}</td>
                  <td>
                    {p.emergency && <span className="sos-badge">🚨 SOS</span>}
                    {p.name}
                  </td>
                  <td>{p.score}</td>
                  <td>
                    <span className={`badge ${priorityColor(p.priority)}`}>{p.priority}</span>
                  </td>
                  <td>{new Date(p.time).toLocaleTimeString()}</td>
                  <td>{(index + 1) * 5} mins</td>
                  <td>
                    <button className="consulted-btn" onClick={() => removePatient(index)}>
                      Consulted ✅
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}