export default function About() {
  return (
    <div className="main">
      <h1>About System</h1>

      <div className="info-box">
        <h2>ER Triage System Overview</h2>
        <p>This Emergency Room Triage System is designed to help medical staff prioritize patients
        based on the severity of their conditions. It uses a scoring algorithm that accounts for
        vital signs, symptoms, age, and risk factors.</p>
        <hr />
        <h3>How It Works</h3>
        <ul>
          <li>Patients are registered with their name, age, gender, symptoms, and vitals.</li>
          <li>A severity score is calculated automatically.</li>
          <li>Patients are sorted in the queue by priority (P1 Critical first).</li>
          <li>Doctors can mark patients as consulted to remove them from the queue.</li>
          <li>Emergency SOS adds a critical patient instantly to the top of the queue.</li>
        </ul>
        <hr />
        <h3>Priority Levels</h3>
        <ul>
          <li><strong>P1 Critical</strong> — Immediate life-threatening emergency</li>
          <li><strong>P2 Emergency</strong> — Serious condition requiring urgent care</li>
          <li><strong>P3 Urgent</strong> — Requires prompt attention</li>
          <li><strong>P4 Semi-Urgent</strong> — Needs care but stable</li>
          <li><strong>P5 Non-Urgent</strong> — Minor issue, can wait</li>
        </ul>
        <hr />
        <h3>Scoring Algorithm</h3>
        <ul>
          <li>Heart rate, temperature, and oxygen level each contribute to a vitals score.</li>
          <li>Age risk adds extra weight for patients under 5 or over 65.</li>
          <li>Each selected symptom adds 1 point to the total score.</li>
          <li>Total score determines the final priority level (P1–P5).</li>
        </ul>
      </div>
    </div>
  );
}