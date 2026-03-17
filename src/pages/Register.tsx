import { useState } from "react";
import { useLocation } from "wouter";

const SYMPTOM_LIST = [
  "Chest Pain", "Breathing Difficulty", "Fever", "Head Injury",
  "Vomiting", "Bleeding", "Unconscious", "Severe Pain", "Dizziness", "Others",
];

export default function Register() {
  const [, navigate] = useLocation();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Female");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [oxygen, setOxygen] = useState("");

  function toggleSymptom(symptom: string) {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  }

  function handleSubmit() {
    const symptoms = selectedSymptoms.filter((s) => s !== "Others");
    if (selectedSymptoms.includes("Others") && otherText.trim()) {
      symptoms.push(otherText.trim());
    }

    if (!name || !age || symptoms.length === 0 || !heartRate || !temperature || !oxygen) {
      alert("⚠️ Please fill all patient details.");
      return;
    }

    const hr = parseInt(heartRate);
    const temp = parseFloat(temperature);
    const oxy = parseInt(oxygen);
    const ageNum = parseInt(age);

    let vitalsScore = 0;
    if (hr > 130 || hr < 40) vitalsScore += 3;
    else if (hr > 100) vitalsScore += 2;
    else vitalsScore += 1;

    if (temp > 39) vitalsScore += 3;
    else if (temp > 37.5) vitalsScore += 2;
    else vitalsScore += 1;

    if (oxy < 90) vitalsScore += 4;
    else if (oxy < 95) vitalsScore += 2;
    else vitalsScore += 1;

    const riskScore = ageNum > 65 || ageNum < 5 ? 2 : 1;
    const totalScore = vitalsScore + riskScore + symptoms.length;

    let priority: string;
    if (totalScore >= 10) priority = "P1 Critical";
    else if (totalScore >= 8) priority = "P2 Emergency";
    else if (totalScore >= 6) priority = "P3 Urgent";
    else if (totalScore >= 4) priority = "P4 Semi-Urgent";
    else priority = "P5 Non-Urgent";

    let severity = "Low";
    if (symptoms.length >= 5) severity = "High";
    else if (symptoms.length >= 3) severity = "Medium";

    const patient = {
      name, age: ageNum, gender, symptoms, hr, temp, oxygen: oxy,
      score: totalScore, priority, vitalsScore, riskScore,
      symptomScore: symptoms.length, severity,
      time: new Date().toISOString(),
    };

    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    patients.push(patient);
    localStorage.setItem("patients", JSON.stringify(patients));
    localStorage.setItem("latest", JSON.stringify(patient));
    localStorage.setItem("severityLevel", severity);

    if (priority.includes("P1")) {
      alert("🚨 Critical Patient Added! Redirecting to queue...");
    }

    navigate("/result");
  }

  return (
    <div className="main">
      <div className="container">
        <h1>Patient Registration</h1>

        <div className="form-group">
          <label>Patient Name</label>
          <input
            type="text"
            placeholder="Enter patient name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <h3>Select Symptoms</h3>
        <div className="symptom-grid">
          {SYMPTOM_LIST.map((symptom) => (
            <button
              key={symptom}
              type="button"
              className={`symptom-btn${selectedSymptoms.includes(symptom) ? " active" : ""}`}
              onClick={() => toggleSymptom(symptom)}
            >
              {symptom}
            </button>
          ))}
        </div>

        {selectedSymptoms.includes("Others") && (
          <div className="form-group">
            <input
              type="text"
              placeholder="Specify Other Symptoms"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
            />
          </div>
        )}

        <h3>Vitals</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Heart Rate (bpm)</label>
            <input
              type="number"
              placeholder="e.g. 80"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Temperature (°C)</label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 37.5"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Oxygen Level (%)</label>
            <input
              type="number"
              placeholder="e.g. 98"
              value={oxygen}
              onChange={(e) => setOxygen(e.target.value)}
            />
          </div>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Calculate Severity & Register
        </button>
      </div>
    </div>
  );
}