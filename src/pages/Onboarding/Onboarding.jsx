import React, { useState } from "react";
import CarbonFootprintForm from "../../components/CarbonFootprintForm/CarbonFootprintForm";
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
          <CarbonFootprintForm isOnboarding={true} />

          <Button variant="contained" color="primary" onClick={nextStep}>
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
          <Button variant="contained" color="primary" onClick={"/offset"}>
            Subscribe to Offset
          </Button>
          <Button variant="contained" color="secondary" onClick={"/dashboard"}>
            Skip for now
          </Button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
