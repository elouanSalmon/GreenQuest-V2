import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Container,
} from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const QuestForm = () => {
  const [questData, setQuestData] = useState({
    title: "",
    description: "",
    category: "",
    subCategory: "",
    target_carbon_consumption: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const categories = [
    "housingEmissions",
    "mobilityEmissions",
    "flyingHabitsEmissions",
    "shoppingFrequencyEmissions",
    "dietEmissions",
    "frCitizenshipEmissions",
  ];

  const subCategories = {
    housingEmissions: [
      "homeSizeEmissions",
      "homeOccupantsEmissions",
      "renewableElectricityEmissions",
    ],
    mobilityEmissions: ["carUsageEmissions", "fuelTypeEmissions"],
  };

  const categoryToCarbonImpactKey = {
    housingEmissions: null,
    mobilityEmissions: null,
    flyingHabitsEmissions: "flyingHabits",
    shoppingFrequencyEmissions: "shoppingFrequency",
    dietEmissions: "diet",
    frCitizenshipEmissions: null,
    homeSizeEmissions: "homeSize",
    homeOccupantsEmissions: "homeOccupants",
    renewableElectricityEmissions: "renewableElectricity",
    carUsageEmissions: "carUsage",
    fuelTypeEmissions: "fuelType",
  };

  const carbonImpactValues = {
    flyingHabits: ["rarely", "occasionally", "regularly", "custom"],
    carUsage: [
      "noDrive",
      "upTo5000",
      "5000to10000",
      "10000to15000",
      "moreThan15000",
    ],
    shoppingFrequency: ["rarely", "average", "shopper", "luxury"],
    homeSize: ["studio", "oneBedroom", "twoBedroom", "threeBedroom"],
    homeOccupants: [
      "justMe",
      "twoPeople",
      "threePeople",
      "fourToSix",
      "sevenOrMore",
    ],
    renewableElectricity: ["yes", "notYet", "notSure"],
    diet: [
      "vegan",
      "vegetarian",
      "pescetarian",
      "eatLessMeat",
      "eatEverything",
    ],
    fuelType: [
      "electricGreen",
      "electric",
      "naturalGas",
      "gasolineDieselHybrid",
      "unknown",
    ],
  };

  const getTargetOptionsForCategory = (category, subCategory) => {
    const key =
      categoryToCarbonImpactKey[category] ||
      categoryToCarbonImpactKey[subCategory];
    if (carbonImpactValues[key]) {
      return carbonImpactValues[key].map((option) => ({
        value: option,
        label: option
          .split(/(?=[A-Z])/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      }));
    }
    return [];
  };

  const targetOptions = getTargetOptionsForCategory(
    questData.category,
    questData.subCategory
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryKey =
        categoryToCarbonImpactKey[questData.category] ||
        categoryToCarbonImpactKey[questData.subCategory];

      const targetCarbonValues = carbonImpactValues[categoryKey];

      if (
        !targetCarbonValues ||
        !targetCarbonValues.includes(questData.target_carbon_consumption)
      ) {
        alert("Invalid category or sub-category provided.");
        return;
      }

      const modifiedQuestData = {
        ...questData,
      };

      const questCollection = collection(db, "quests");
      await addDoc(questCollection, modifiedQuestData);
      alert("Quest created successfully");
      setQuestData({
        title: "",
        description: "",
        category: "",
        subCategory: "",
        target_carbon_consumption: "",
        image: "",
      });
    } catch (error) {
      console.error("Error creating quest:", error);
    }
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} padding={3}>
        <TextField
          label="Title"
          name="title"
          value={questData.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Description"
          name="description"
          value={questData.description}
          onChange={handleChange}
          fullWidth
          multiline
          required
        />
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          name="category"
          value={questData.category}
          onChange={handleChange}
          fullWidth
          required
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>

        {subCategories[questData.category] && (
          <>
            <InputLabel id="sub-category-label">Sub-Category</InputLabel>
            <Select
              labelId="sub-category-label"
              name="subCategory"
              value={questData.subCategory}
              onChange={handleChange}
              fullWidth
              required
            >
              {subCategories[questData.category].map((sub) => (
                <MenuItem key={sub} value={sub}>
                  {sub}
                </MenuItem>
              ))}
            </Select>
          </>
        )}

        <InputLabel id="target-carbon-consumption-label">
          Target Carbon Consumption
        </InputLabel>
        <Select
          labelId="target-carbon-consumption-label"
          name="target_carbon_consumption"
          value={questData.target_carbon_consumption}
          onChange={handleChange}
          fullWidth
          required
        >
          {targetOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Image"
          name="image"
          value={questData.image}
          onChange={handleChange}
          fullWidth
          required
        />

        <Button type="submit" color="primary" variant="contained">
          Create Quest
        </Button>
      </Box>
    </Container>
  );
};

export default QuestForm;
