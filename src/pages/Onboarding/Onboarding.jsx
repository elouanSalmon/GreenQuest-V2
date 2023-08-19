import React, { useState, useRef } from "react";
import CarbonFootprintForm from "../../components/CarbonFootprintForm/CarbonFootprintForm";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { saveOnboardingCompletion } from "../../services/firebase";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const formRef = useRef(null); // Ajout d'une référence pour le formulaire

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleFormSubmit = async () => {
    if (formRef.current) {
      await formRef.current.handleSubmit(); // Appeler la fonction handleSubmit du composant CarbonFootprintForm
      nextStep();
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h1>Welcome to GreenQuest!</h1>
          <p>
            Congratulations on joining the adventure! Here's a brief overview of
            what awaits you in our app.
          </p>
          <Button variant="contained" color="primary" onClick={nextStep}>
            Next
          </Button>
        </div>
      )}

      {step === 2 && (
        <div>
          <CarbonFootprintForm isOnboarding={true} ref={formRef} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            Next
          </Button>
        </div>
      )}

      {step === 3 && (
        <div>
          <p>
            Consider offsetting your carbon footprint with a subscription before
            accessing the results.
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/offset");
              saveOnboardingCompletion(currentUser.uid, true);
            }}
          >
            Subscribe to Offset
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              navigate("/dashboard");
              // Add this line to update the state
              saveOnboardingCompletion(currentUser.uid, true);
            }}
          >
            Skip for now
          </Button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
