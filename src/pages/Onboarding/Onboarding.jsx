import React, { useState, useRef } from "react";
import CarbonFootprintForm from "../../components/Form/CarbonFootprintForm/CarbonFootprintForm";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { saveOnboardingCompletion } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { currentUser } = useAuth();

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleFormSubmit = async () => {
    if (formRef.current) {
      await formRef.current.handleSubmit();
      nextStep();
    }
  };

  return (
    <Container>
      {step === 1 && (
        <div>
          <h1>Welcome to CarbonQuest!</h1>
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
            onClick={async () => {
              navigate("/offset");
              await saveOnboardingCompletion(currentUser.uid, true);
              await fetchUserOnboardingStatus(); // Refetch the onboarding status
            }}
          >
            Subscribe to Offset
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={async () => {
              navigate("/dashboard");
              await saveOnboardingCompletion(currentUser.uid, true);
              await fetchUserOnboardingStatus(); // Refetch the onboarding status
            }}
          >
            Skip for now
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Onboarding;
