// Offset.jsx
import React, { useState } from 'react';
import OffsetSelection from '../../components/OffsetSelection/OffsetSelection';
import OffsetPlan from '../../components/OffsetPlan/OffsetPlan';

function Offset() {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showOffsetPlan, setShowOffsetPlan] = useState(false);
  const [totalEmissions, setTotalEmissions] = useState(0); // Add this line

  const handleContinue = (projects, emissions) => { // Modify this line
    setSelectedProjects(projects);
    setTotalEmissions(emissions); // Add this line
    setShowOffsetPlan(true);
  };

  return (
    <>
      {showOffsetPlan ? (
        <OffsetPlan selectedProjects={selectedProjects} totalEmissions={totalEmissions} /> // Modify this line
      ) : (
        <OffsetSelection onContinue={handleContinue} />
      )}
    </>
  );
}

export default Offset;