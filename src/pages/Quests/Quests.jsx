import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import QuestCard from '../../components/QuestCard/QuestCard';
import './Quests.css';

const Quests = () => {
  const [quests, setQuests] = useState([]);
  const [userCarbonFootprint, setUserCarbonFootprint] = useState({});
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(null);

  useEffect(() => {
    const fetchQuests = async () => {
      const questCollection = collection(db, 'quests');
      const questSnapshot = await getDocs(questCollection);
      const questList = questSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setQuests(questList);
    };

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

    fetchQuests();
    fetchUserCarbonFootprint();
  }, []);

  const handleOpen = (quest) => {
    setSelectedQuest(quest);
    setIsPageVisible(true);
  };

  const handleClose = () => {
    setIsPageVisible(false);
  };

  if (!userCarbonFootprint) return <div>Loading...</div>;

  return (
    <div>
      {quests.map((quest) => {
        if (quest.category && userCarbonFootprint.hasOwnProperty(`${quest.category}Emissions`)) {
          return (
            <QuestCard
              key={quest.id}
              quest={quest}
              userCarbonFootprint={userCarbonFootprint}
              handleOpen={handleOpen}
            />
          );
        } else {
          return null;
        }
      })}
      <div
        className={`sliding-page ${isPageVisible ? 'visible' : ''}`}
        onClick={handleClose}
      >
        {selectedQuest && (
          <>
            <h2>{selectedQuest.title}</h2>
            <p>{selectedQuest.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Quests;