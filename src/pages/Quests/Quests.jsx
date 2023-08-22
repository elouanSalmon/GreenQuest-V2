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
  const [unstartedQuests, setUnstartedQuests] = useState([]);
  const [activeQuests, setActiveQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);

  useEffect(() => {
    fetchAllQuestData();
  }, []);

  const fetchAllQuestData = async () => {
    await fetchQuests();
    await fetchStartedQuests();
    categorizeQuests(); // Add this line
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
        startedAt: doc.data().startedAt, // Add this line
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

  return (
    <div>
      <h2>Quests in progress</h2>
      <Grid container spacing={3}>
        {activeQuests.length > 0 ? (
          activeQuests.map((quest) => {
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
          })
        ) : (
          <p>
            You haven't started any quests yet. Please select one from the
            available quests below!
          </p>
        )}
      </Grid>

      <h2>Completed Quests</h2>
      <Grid container spacing={3}>
        {completedQuests.length > 0 ? (
          completedQuests.map((quest) => {
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
          })
        ) : (
          <p>
            You haven't completed any quests yet. Keep going, you're on the
            right track!
          </p>
        )}
      </Grid>

      <h2>Available quests</h2>
      <Grid container spacing={3}>
        {unstartedQuests.length > 0 ? (
          unstartedQuests.map((quest) => {
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
          })
        ) : (
          <p>All quests have been started or completed. Great job!</p>
        )}
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
