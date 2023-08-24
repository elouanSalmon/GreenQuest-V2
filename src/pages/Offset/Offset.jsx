import React, { useState } from "react";
import OffsetSelection from "../../components/Offset/OffsetSelection/OffsetSelection";
import OffsetPlan from "../../components/Offset/OffsetPlan/OffsetPlan";
import Payment from "../../components/Offset/Payment/Payment";
import { Container } from "@mui/system";

function Offset() {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [showOffsetPlan, setShowOffsetPlan] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [cost, setCost] = useState(0); // Ajoutez cette ligne

  const handleContinue = (projects, emissions) => {
    setSelectedProjects(projects);
    setShowOffsetPlan(true);
  };

  const handleSelectPlan = (calculatedCost) => {
    // Ajoutez l'argument calculatedCost
    setCost(calculatedCost); // Utilisez le coût calculé
    setShowOffsetPlan(false);
    setShowPayment(true);
  };

  return (
    <Container>
      {showOffsetPlan ? (
        <OffsetPlan
          selectedProjects={selectedProjects}
          onSelectPlan={handleSelectPlan}
        />
      ) : showPayment ? (
        <Payment cost={cost} /> // Passez le coût comme une prop
      ) : (
        <OffsetSelection onContinue={handleContinue} />
      )}
    </Container>
  );
}

export default Offset;
