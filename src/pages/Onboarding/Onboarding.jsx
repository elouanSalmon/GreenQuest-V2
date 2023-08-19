import React, { useState } from "react";
import CarbonFootprintForm from "../../components/CarbonFootprintForm/CarbonFootprintForm";
import OffsetSelection from "../../components/OffsetSelection/OffsetSelection";
import { Button } from "@mui/material";

const Onboarding = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h1>Félicitations pour rejoindre l'aventure!</h1>
          <p>
            Bienvenue à GreenQuest! Ici, vous découvrirez comment réduire votre
            empreinte carbone et contribuer à un monde plus vert.
          </p>
          <Button variant="contained" color="primary" onClick={nextStep}>
            Suivant
          </Button>
        </div>
      )}

      {step === 2 && (
        <div>
          <CarbonFootprintForm />
          <Button variant="contained" color="primary" onClick={nextStep}>
            Suivant
          </Button>
        </div>
      )}

      {step === 3 && (
        <div>
          <OffsetSelection />
          {/* Vous pouvez ajouter des boutons pour la sélection de l'abonnement et le renvoi vers le tableau de bord ici. */}
        </div>
      )}
    </div>
  );
};

export default Onboarding;
