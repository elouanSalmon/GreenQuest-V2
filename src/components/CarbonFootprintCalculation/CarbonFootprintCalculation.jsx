// carbonFootprintCalculation.js

export function calculateCarbonFootprint(formData) {
  const carbonImpactValues = {
    flyingHabits: {
      rarely: 0,
      occasionally: 500,
      regularly: 1500,
      custom: parseFloat(formData.customFlyingAmount) || 0,
    },
    carUsage: {
      noDrive: 0,
      upTo5000: 750,
      "5000to10000": 1500,
      "10000to15000": 2250,
      moreThan15000: 3000,
    },
    carFuel: {
      electricGreen: -200,
      electric: 0,
      naturalGas: 100,
      gasolineDieselHybrid: 200,
      dontKnow: 0,
    },
  };

  const baselineValue = 4000;

  const flyingHabitsEmissions =
    carbonImpactValues.flyingHabits[formData.flyingHabits];
  const carUsageEmissions = carbonImpactValues.carUsage[formData.carUsage];
  const carFuelEmissions = carbonImpactValues.carFuel[formData.carFuel];

  const totalEmissions =
    baselineValue + flyingHabitsEmissions + carUsageEmissions + carFuelEmissions;

  return {
    totalEmissions: totalEmissions,
    flyingHabitsEmissions: flyingHabitsEmissions,
    carUsageEmissions: carUsageEmissions,
    carFuelEmissions: carFuelEmissions,
  };
}
