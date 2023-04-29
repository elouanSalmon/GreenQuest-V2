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
    shoppingFrequency: {
      rarely: 0,
      average: 300,
      shopper: 600,
      luxury: 1200,
    },
    homeSize: {
      studio: 500,
      oneBedroom: 1000,
      twoBedroom: 1500,
      threeBedroom: 2000,
    },
    homeOccupants: {
      justMe: 0,
      twoPeople: -200,
      threePeople: -400,
      fourToSix: -600,
      sevenOrMore: -800,
    },
    renewableElectricity: {
      yes: -500,
      notYet: 0,
      notSure: 0,
    },
    diet: {
      vegan: -500,
      vegetarian: -250,
      pescetarian: 0,
      eatLessMeat: 250,
      eatEverything: 500,
    },
    fuelType: {
      electricGreen: -200,
      electric: 0,
      naturalGas: 100,
      gasolineDieselHybrid: 200,
      unknown: 0,
    },
  };

  const baselineValue = 4000;

  const flyingHabitsEmissions =
    carbonImpactValues.flyingHabits[formData.flyingHabits];
  const carUsageEmissions = carbonImpactValues.carUsage[formData.carUsage];
  const shoppingFrequencyEmissions =
    carbonImpactValues.shoppingFrequency[formData.shoppingFrequency];
  const homeSizeEmissions = carbonImpactValues.homeSize[formData.homeSize];
  const homeOccupantsEmissions =
    carbonImpactValues.homeOccupants[formData.homeOccupants];
  const renewableElectricityEmissions =
    carbonImpactValues.renewableElectricity[formData.renewableElectricity];
  const dietEmissions = carbonImpactValues.diet[formData.diet];
  const fuelTypeEmissions = carbonImpactValues.fuelType[formData.fuelType];

  const totalEmissions =
    baselineValue +
    flyingHabitsEmissions +
    carUsageEmissions +
    shoppingFrequencyEmissions +
    homeSizeEmissions +
    homeOccupantsEmissions +
    renewableElectricityEmissions +
    dietEmissions +
    fuelTypeEmissions;

  return {
    totalEmissions: totalEmissions / 1000,
    flyingHabitsEmissions: flyingHabitsEmissions / 1000,
    carUsageEmissions: carUsageEmissions / 1000,
    shoppingFrequencyEmissions: shoppingFrequencyEmissions / 1000,
    homeSizeEmissions: homeSizeEmissions / 1000,
    homeOccupantsEmissions: homeOccupantsEmissions / 1000,
    renewableElectricityEmissions: renewableElectricityEmissions / 1000,
    dietEmissions: dietEmissions / 1000,
    fuelTypeEmissions: fuelTypeEmissions / 1000,
  };
}