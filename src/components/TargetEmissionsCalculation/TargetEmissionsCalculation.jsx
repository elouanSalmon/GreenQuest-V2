export const getTargetEmissionsValue = (category, objective) => {
  const carbonReductionTargets = {
    flyingHabitsEmissions: {
      rarely: 0,
      occasionally: 1.5,
      regularly: 4.5,
      custom: (parseFloat(objective) * 0.5) / 1000, // Updated division by 1000
    },
    carUsageEmissions: {
      noDrive: 0,
      upTo5000: 2.5,
      "5000to10000": 5,
      "10000to15000": 7.5,
      moreThan15000: 10,
    },
    shoppingFrequencyEmissions: {
      rarely: 0,
      average: 0.15,
      shopper: 0.3,
      luxury: 0.6,
    },
    homeSizeEmissions: {
      studio: 0.25,
      oneBedroom: 0.5,
      twoBedroom: 0.75,
      threeBedroom: 1,
    },
    dietEmissions: {
      vegan: 1,
      vegetarian: 1.25,
      pescetarian: 1.625,
      eatLessMeat: 1.825,
      eatEverything: 2.5,
    },
    // Add more categories as needed.
  };

  return carbonReductionTargets[category] &&
    carbonReductionTargets[category][objective]
    ? carbonReductionTargets[category][objective]
    : 0;
};
