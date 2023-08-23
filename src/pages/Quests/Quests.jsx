//Quests.jsx:

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

import QuestCard from "../../components/Quests/QuestCard/QuestCard";
import QuestModal from "../../components/Quests/QuestModal/QuestModal";

import UnstartedQuests from "../../components/Quests/UnstartedQuests/UnstartedQuests";
import CompletedQuests from "../../components/Quests/CompletedQuests/CompletedQuests";
import ActiveQuests from "../../components/Quests/ActiveQuests/ActiveQuests";

import { getTargetEmissionsValue } from "../../components/TargetEmissionsCalculation/TargetEmissionsCalculation";
import handleQuestCompletion from "../../components/Quests/QuestCompletionHandler/QuestCompletionHandler";

import { Grid, Container } from "@mui/material/";
import ReactConfetti from "react-confetti";

const Quests = () => {
  const [quests, setQuests] = useState([]);
  const [userCarbonFootprint, setUserCarbonFootprint] = useState(null);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [startedQuests, setStartedQuests] = useState([]);
  const [unstartedQuests, setUnstartedQuests] = useState([]);
  const [activeQuests, setActiveQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);

  useEffect(() => {
    fetchAllQuestData();
  }, []);

  const fetchAllQuestData = async () => {
    await fetchQuests();
    await fetchStartedQuests();
    categorizeQuests();
  };

  useEffect(() => {
    fetchQuests();
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

    // Update the quest status in the database
    const userId = auth.currentUser.uid;
    const userQuestsCollection = collection(db, "userQuests");
    const questRef = doc(userQuestsCollection, `${userId}_${quest.id}`);
    await updateDoc(questRef, {
      status: "completed",
      completedAt: new Date(), // Ajout de la date de complétion
    });

    // Refresh the quest lists
    await fetchAllQuestData();
    // Affichez les confettis
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const fetchQuests = async () => {
    const questsCollection = collection(db, "quests");
    const questsSnapshot = await getDocs(questsCollection);
    const fetchedQuests = questsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setQuests(fetchedQuests);
  };

  const fetchStartedQuests = async () => {
    const userId = auth.currentUser.uid;
    const userQuestsCollection = collection(db, "userQuests");
    const userQuestsSnapshot = await getDocs(userQuestsCollection);
    const fetchedUserQuests = userQuestsSnapshot.docs
      .filter((doc) => doc.data().userId === userId)
      .map((doc) => ({
        questId: doc.data().questId,
        status: doc.data().status,
        startedAt: doc.data().startedAt,
        completedAt: doc.data().completedAt, // Ajoutez cette ligne
      }));

    setStartedQuests(fetchedUserQuests);
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const handleStart = async (quest) => {
    const userId = auth.currentUser.uid;
    const userQuestsCollection = collection(db, "userQuests");
    const questRef = doc(userQuestsCollection, `${userId}_${quest.id}`);

    const questSnap = await getDoc(questRef);
    if (questSnap.exists()) {
      alert("Vous avez déjà commencé cette quête !");
    } else {
      await setDoc(questRef, {
        userId: userId,
        questId: quest.id,
        startedAt: new Date(),
        status: "started", // Assurez-vous que le statut est défini sur "started"
      });
      console.log(`Quest ${quest.id} started for user ID: ${userId}`);

      // Update the local state
      setStartedQuests((prev) => [
        ...prev,
        { questId: quest.id, status: "started" },
      ]);
    }
  };

  const handleCancel = async (quest) => {
    const userId = auth.currentUser.uid;
    const userQuestsCollection = collection(db, "userQuests");
    const questRef = doc(userQuestsCollection, `${userId}_${quest.id}`);

    try {
      await deleteDoc(questRef);
      console.log(`Quest ${quest.id} cancelled for user ID: ${userId}`);

      // Update the local state
      setStartedQuests((prev) => prev.filter((q) => q.questId !== quest.id));
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

  // Re-evaluate the lists every time the startedQuests state changes
  useEffect(() => {
    const unstarted = quests.filter(
      (quest) => !startedQuests.some((q) => q.questId === quest.id)
    );
    const active = quests.filter((quest) =>
      startedQuests.some(
        (q) => q.questId === quest.id && q.status === "started"
      )
    );
    const completed = quests.filter((quest) =>
      startedQuests.some(
        (q) => q.questId === quest.id && q.status === "completed"
      )
    );

    setUnstartedQuests(unstarted);
    setActiveQuests(active);
    setCompletedQuests(completed);
  }, [quests, startedQuests]);

  const categorizeQuests = () => {
    const unstarted = quests.filter(
      (quest) => !startedQuests.some((q) => q.questId === quest.id)
    );
    const active = quests.filter((quest) =>
      startedQuests.some(
        (q) => q.questId === quest.id && q.status === "started"
      )
    );
    const completed = quests.filter((quest) =>
      startedQuests.some(
        (q) => q.questId === quest.id && q.status === "completed"
      )
    );

    setUnstartedQuests(unstarted);
    setActiveQuests(active);
    setCompletedQuests(completed);
  };

  // Update the useEffect that re-evaluates the lists every time the startedQuests state changes
  useEffect(() => {
    categorizeQuests();
  }, [quests, startedQuests]);

  // État pour gérer l'affichage des confettis
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <Container>
      {showConfetti && <ReactConfetti />}
      <ActiveQuests
        activeQuests={activeQuests}
        userCarbonFootprint={userCarbonFootprint}
        getTargetEmissions={getTargetEmissions}
        handleOpen={handleOpen}
        handleComplete={handleComplete}
        handleStart={handleStart}
        handleCancel={handleCancel}
        startedQuests={startedQuests}
      />

      <CompletedQuests
        completedQuests={completedQuests}
        userCarbonFootprint={userCarbonFootprint}
        getTargetEmissions={getTargetEmissions}
        handleOpen={handleOpen}
        handleComplete={handleComplete}
        handleStart={handleStart}
        handleCancel={handleCancel}
        startedQuests={startedQuests}
      />

      <UnstartedQuests
        unstartedQuests={unstartedQuests}
        userCarbonFootprint={userCarbonFootprint}
        getTargetEmissions={getTargetEmissions}
        handleOpen={handleOpen}
        handleComplete={handleComplete}
        handleStart={handleStart}
        handleCancel={handleCancel}
        startedQuests={startedQuests}
      />

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
    </Container>
  );
};
export default Quests;
