import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { db, auth } from "../../services/firebase";
import QuestCard from "../../components/QuestCard/QuestCard";
import QuestModal from "../../components/QuestModal/QuestModal";
import Grid from "@mui/material/Grid";
import { getTargetEmissionsValue } from "../../components/TargetEmissionsCalculation/TargetEmissionsCalculation";
import handleQuestCompletion from "../../components/QuestCompletionHandler/QuestCompletionHandler";

const Quests = () => {
  const [quests, setQuests] = useState([]);
  const [userCarbonFootprint, setUserCarbonFootprint] = useState(null);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [startedQuests, setStartedQuests] = useState([]);
  const unstartedQuests = quests.filter(
    (quest) => !startedQuests.includes(quest.id)
  );
  const activeQuests = quests.filter((quest) =>
    startedQuests.includes(quest.id)
  );

  useEffect(() => {
    const fetchStartedQuests = async () => {
      const userId = auth.currentUser.uid;
      const startedQuestsCollection = collection(db, "startedQuests");
      const startedQuestsSnapshot = await getDocs(startedQuestsCollection);
      const fetchedStartedQuests = startedQuestsSnapshot.docs
        .filter((doc) => doc.data().userId === userId)
        .map((doc) => doc.data().questId);
      setStartedQuests(fetchedStartedQuests);
    };

    fetchStartedQuests();
  }, []);

  useEffect(() => {
    const fetchUserCarbonFootprint = async () => {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "carbon-footprint", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserCarbonFootprint(docSnap.data());
      } else {
        setUserCarbonFootprint({});
      }
    };

    fetchUserCarbonFootprint();
  }, []);

  useEffect(() => {
    const fetchQuests = async () => {
      const questsCollection = collection(db, "quests");
      const questsSnapshot = await getDocs(questsCollection);
      const fetchedQuests = questsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuests(fetchedQuests);
    };

    fetchQuests();
  }, []);

  const handleOpen = (quest) => {
    setSelectedQuest(quest);
    setIsPageVisible(true);
  };

  const handleClose = () => {
    setIsPageVisible(false);
  };

  const handleComplete = async (quest) => {
    await handleQuestCompletion(
      quest,
      userCarbonFootprint,
      setUserCarbonFootprint
    );
  };

  const handleStart = async (quest) => {
    const userId = auth.currentUser.uid;
    const startedQuestsCollection = collection(db, "startedQuests");
    const questRef = doc(startedQuestsCollection, `${userId}_${quest.id}`);

    // Vérifiez si l'utilisateur a déjà démarré cette quête
    const questSnap = await getDoc(questRef);
    if (questSnap.exists()) {
      // Informez l'utilisateur qu'il a déjà démarré cette quête
      alert("Vous avez déjà commencé cette quête !");
    } else {
      // Si l'utilisateur n'a pas démarré la quête, ajoutez-la
      await setDoc(questRef, {
        userId: userId,
        questId: quest.id,
        startedAt: new Date(), // Timestamp of when the quest was started
      });
      console.log(`Quest ${quest.id} started for user ID: ${userId}`);
    }
  };

  const handleCancel = async (quest) => {
    const userId = auth.currentUser.uid;
    const startedQuestsCollection = collection(db, "startedQuests");
    const questRef = doc(startedQuestsCollection, `${userId}_${quest.id}`);

    try {
      await deleteDoc(questRef); // Supprime la quête commencée
      console.log(`Quest ${quest.id} cancelled for user ID: ${userId}`);
    } catch (error) {
      console.error("Error cancelling quest: ", error);
    }
  };

  const getTargetEmissions = (quest) => {
    if (!quest) return 0;

    return getTargetEmissionsValue(
      quest.category,
      quest.subCategory,
      quest.target_carbon_consumption,
      userCarbonFootprint
    );
  };

  return (
    <div>
      <h2>Quests in progress</h2>
      <Grid container spacing={3}>
        {activeQuests.map((quest) => {
          const targetEmissions = getTargetEmissions(quest);
          return (
            <Grid item xs={12} sm={6} md={4} key={quest.id}>
              <QuestCard
                quest={quest}
                userCarbonFootprint={userCarbonFootprint}
                targetEmissions={targetEmissions}
                handleOpen={handleOpen}
                handleComplete={handleComplete}
                handleStart={handleStart}
                handleCancel={handleCancel}
                startedQuests={startedQuests}
              />
            </Grid>
          );
        })}
      </Grid>

      <h2>Available quests</h2>
      <Grid container spacing={3}>
        {unstartedQuests.map((quest) => {
          const targetEmissions = getTargetEmissions(quest);
          return (
            <Grid item xs={12} sm={6} md={4} key={quest.id}>
              <QuestCard
                quest={quest}
                userCarbonFootprint={userCarbonFootprint}
                targetEmissions={targetEmissions}
                handleOpen={handleOpen}
                handleComplete={handleComplete}
                handleStart={handleStart}
                handleCancel={handleCancel}
                startedQuests={startedQuests}
              />
            </Grid>
          );
        })}
      </Grid>

      <div
        className={`sliding-page ${isPageVisible ? "visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <QuestModal
          open={isPageVisible}
          handleClose={handleClose}
          selectedQuest={selectedQuest}
          currentEmissions={
            userCarbonFootprint?.[`${selectedQuest?.category}Emissions`] || 0
          }
          targetEmissions={
            selectedQuest ? getTargetEmissions(selectedQuest) : 0
          }
        />
      </div>
    </div>
  );
};
export default Quests;
