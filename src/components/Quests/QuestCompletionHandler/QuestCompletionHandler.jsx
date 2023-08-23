import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../../../services/firebase";
import { getTargetEmissionsValue } from "../../../components/TargetEmissionsCalculation/TargetEmissionsCalculation";

export const handleQuestCompletion = async (
  quest,
  userCarbonFootprint,
  setUserCarbonFootprint
) => {
  const userId = auth.currentUser.uid;
  const docRef = doc(db, "carbon-footprint", userId);

  // Calcul des émissions mises à jour pour la catégorie principale.
  const updatedEmissions = getTargetEmissionsValue(
    quest.category,
    quest.subCategory,
    quest.target_carbon_consumption,
    userCarbonFootprint
  );

  const updates = {
    [`${quest.category}`]: updatedEmissions,
    totalEmissions:
      userCarbonFootprint.totalEmissions -
      (userCarbonFootprint[quest.category] || 0) +
      updatedEmissions,
  };

  // Si une subCategory est spécifiée, mettez à jour ces émissions aussi.
  if (quest.subCategory) {
    const updatedSubEmissions = getTargetEmissionsValue(
      quest.subCategory,
      null,
      quest.target_carbon_consumption,
      userCarbonFootprint
    );
    updates[`${quest.subCategory}`] = updatedSubEmissions * 1000;
  }

  await updateDoc(docRef, updates);

  setUserCarbonFootprint((prev) => ({
    ...prev,
    ...updates,
  }));
};

export default handleQuestCompletion;
