import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import QuestCard from "../../components/QuestCard/QuestCard";
import QuestModal from "../../components/QuestModal/QuestModal";
import Grid from "@mui/material/Grid";

const Quests = () => {
  const [quests, setQuests] = useState([]);
  const [userCarbonFootprint, setUserCarbonFootprint] = useState(null);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);

  useEffect(() => {
    const fetchQuests = async () => {
      const questCollection = collection(db, "quests");
      const questSnapshot = await getDocs(questCollection);
      const fetchedQuests = questSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setQuests(fetchedQuests);
    };

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

  if (userCarbonFootprint === null) return <div>Loading...</div>;

  return (
    <div>
      <Grid container spacing={3}>
        {quests.map((quest) => {
          if (quest.category) {
            return (
              <Grid item xs={12} sm={6} md={4} key={quest.id}>
                <QuestCard
                  quest={quest}
                  userCarbonFootprint={userCarbonFootprint}
                  handleOpen={handleOpen}
                />
              </Grid>
            );
          } else {
            return null;
          }
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
            parseFloat(selectedQuest?.target_carbon_consumption) || 0
          }
        />
      </div>
    </div>
  );
};

export default Quests;
