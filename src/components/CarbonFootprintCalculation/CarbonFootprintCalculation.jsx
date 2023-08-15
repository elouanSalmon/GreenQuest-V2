export function calculateCarbonFootprint(formData) {
  const carbonImpactValues = {
    flyingHabits: {
      rarely: 0,
      occasionally: 3000,
      regularly: 9000,
      custom: parseFloat(formData.customFlyingAmount) || 0,
    },
    carUsage: {
      noDrive: 0,
      upTo5000: 5000,
      "5000to10000": 10000,
      "10000to15000": 15000,
      moreThan15000: 20000,
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
      justMe: 1,
      twoPeople: 2,
      threePeople: 3,
      fourToSix: 6,
      sevenOrMore: 7,
    },
    renewableElectricity: {
      yes: 0.8,
      notYet: 1,
      notSure: 1,
    },
    diet: {
      vegan: 2000,
      vegetarian: 2500,
      pescetarian: 3250,
      eatLessMeat: 3650,
      eatEverything: 5000,
    },
    fuelType: {
      electricGreen: 0, // green energy for vehicle, zero emissions
      electric: 0.05, // standard electric, 0.05 kg CO2 per km
      naturalGas: 0.07, // 0.07 kg CO2 per km
      gasolineDieselHybrid: 0.2, // petrol vehicles, 0.2 kg CO2 per km
      unknown: 0.2, // average estimation, 0.1 kg CO2 per km
    },
    frCitizenshipEmissions: 4000,
  };

  const {
    flyingHabits,
    carUsage,
    shoppingFrequency,
    homeSize,
    homeOccupants,
    renewableElectricity,
    diet,
    fuelType,
  } = formData;

  const flyingHabitsEmissions = carbonImpactValues.flyingHabits[flyingHabits];
  const carUsageEmissions = carbonImpactValues.carUsage[carUsage];
  const shoppingFrequencyEmissions =
    carbonImpactValues.shoppingFrequency[shoppingFrequency];
  const homeSizeEmissions = carbonImpactValues.homeSize[homeSize];
  const homeOccupantsEmissions =
    carbonImpactValues.homeOccupants[homeOccupants];
  const renewableElectricityEmissions =
    carbonImpactValues.renewableElectricity[renewableElectricity];
  const dietEmissions = carbonImpactValues.diet[diet];
  const fuelTypeEmissions = carbonImpactValues.fuelType[fuelType];

  const housingEmissions =
    (homeSizeEmissions * renewableElectricityEmissions) /
    homeOccupantsEmissions;
  const mobilityEmissions = carUsageEmissions * fuelTypeEmissions;

  const baselineValue = 0;
  const frCitizenshipEmissions = carbonImpactValues.frCitizenshipEmissions;

  const totalEmissions =
    (baselineValue +
      frCitizenshipEmissions +
      flyingHabitsEmissions +
      mobilityEmissions +
      shoppingFrequencyEmissions +
      housingEmissions +
      dietEmissions) /
    1000;

  return {
    flyingHabitsEmissions: flyingHabitsEmissions / 1000,
    carUsageEmissions: carUsageEmissions,
    shoppingFrequencyEmissions: shoppingFrequencyEmissions / 1000,
    homeSizeEmissions: homeSizeEmissions,
    homeOccupantsEmissions: homeOccupantsEmissions,
    renewableElectricityEmissions: renewableElectricityEmissions,
    dietEmissions: dietEmissions / 1000,
    fuelTypeEmissions: fuelTypeEmissions,
    housingEmissions: housingEmissions / 1000,
    mobilityEmissions: mobilityEmissions / 1000,
    totalEmissions,
    frCitizenshipEmissions: frCitizenshipEmissions / 1000,
  };
}
