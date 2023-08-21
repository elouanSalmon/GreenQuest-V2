export const getTargetEmissionsValue = (
  category,
  subCategory,
  objective,
  userCarbonFootprint
) => {
  const carbonReductionTargets = {
    flyingHabitsEmissions: {
      rarely: 0,
      occasionally: 3000,
      regularly: 9000,
      custom: 0, // Updated division by 1000
    },
    carUsageEmissions: {
      noDrive: 0,
      upTo5000: 5000,
      "5000to10000": 10000,
      "10000to15000": 15000,
      moreThan15000: 20000,
    },
    shoppingFrequencyEmissions: {
      rarely: 0,
      average: 300,
      shopper: 600,
      luxury: 1200,
    },
    homeSizeEmissions: {
      studio: 500,
      oneBedroom: 1000,
      twoBedroom: 1500,
      threeBedroom: 2000,
    },
    dietEmissions: {
      vegan: 2000,
      vegetarian: 2500,
      pescetarian: 3250,
      eatLessMeat: 3650,
      eatEverything: 5000,
    },
    homeOccupantsEmissions: {
      justMe: 1,
      twoPeople: 2,
      threePeople: 3,
      fourToSix: 6,
      sevenOrMore: 7,
    },
    renewableElectricityEmissions: {
      yes: 0.8,
      notYet: 1,
      notSure: 1,
    },
    fuelTypeEmissions: {
      electricGreen: 0, // green energy for vehicle, zero emissions
      electric: 0.05, // standard electric, 0.05 kg CO2 per km
      naturalGas: 0.07, // 0.07 kg CO2 per km
      gasolineDieselHybrid: 0.2, // petrol vehicles, 0.2 kg CO2 per km
      unknown: 0.2, // average estimation, 0.1 kg CO2 per km
    },
    frCitizenshipEmissions: 4000,
  };

  // Si la catégorie ou l'objectif sont absents, on renvoie 0.
  if (!category || !objective) return 0;

  let targetValueForObjective =
    carbonReductionTargets[category] &&
    carbonReductionTargets[category][objective]
      ? carbonReductionTargets[category][objective]
      : 0;

  if (subCategory) {
    // Here, for each quest's subcategory, we replace the user's current emissions with the target emissions
    targetValueForObjective =
      carbonReductionTargets[subCategory] &&
      carbonReductionTargets[subCategory][objective]
        ? carbonReductionTargets[subCategory][objective]
        : targetValueForObjective;

    let modifiedFootprint = { ...userCarbonFootprint };
    modifiedFootprint[subCategory] = targetValueForObjective;

    switch (category) {
      case "housingEmissions":
        const homeSize = modifiedFootprint.homeSizeEmissions || 0;
        const renewableElectricity =
          modifiedFootprint.renewableElectricityEmissions || 0;
        const homeOccupants = modifiedFootprint.homeOccupantsEmissions || 0;
        return (homeSize * renewableElectricity) / homeOccupants / 1000;

      case "mobilityEmissions":
        const carUsage = modifiedFootprint.carUsageEmissions || 0; // récupère la valeur de 'carUsageEmissions' du footprint modifié
        const fuelType = modifiedFootprint.fuelTypeEmissions || 0; // récupère la valeur de 'fuelTypeEmissions' du footprint modifié

        return (carUsage * fuelType) / 1000;
    }
  } else {
    return targetValueForObjective / 1000;
  }
};
