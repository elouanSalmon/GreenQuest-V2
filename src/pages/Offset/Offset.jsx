import React, { useState } from 'react';
import OffsetSelection from '../../components/OffsetSelection/OffsetSelection';
import OffsetPlan from '../../components/OffsetPlan/OffsetPlan';
import Payment from '../../components/Payment/Payment';

function Offset() {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showOffsetPlan, setShowOffsetPlan] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleContinue = (projects, emissions) => {
    setSelectedProjects(projects);
    setShowOffsetPlan(true);
  };

  const handleSelectPlan = () => {
    setShowOffsetPlan(false);
    setShowPayment(true);
  };

  return (
    <>
      {showOffsetPlan ? (
        <OffsetPlan selectedProjects={selectedProjects} onSelectPlan={handleSelectPlan} />
      ) : showPayment ? (
        <Payment />
      ) : (
        <OffsetSelection onContinue={handleContinue} />
      )}
    </>
  );
}

export default Offset;