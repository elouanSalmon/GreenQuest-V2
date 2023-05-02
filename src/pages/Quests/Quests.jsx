import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebase';
import QuestCard from '../../components/QuestCard/QuestCard';

const Quests = () => {
  const [quests, setQuests] = useState([]);
  const [userCarbonFootprint, setUserCarbonFootprint] = useState(null);

  useEffect(() => {
    const fetchQuests = async () => {
      const questCollection = collection(db, 'quests');
      const questSnapshot = await getDocs(questCollection);
      const questList = questSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log('Fetched quests:', questList); 
      setQuests(questList);
    };

    const fetchUserCarbonFootprint = async () => {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "carbon-footprint", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserCarbonFootprint(docSnap.data());
      }
    };

    fetchQuests();
    fetchUserCarbonFootprint();
  }, []);

  if (!userCarbonFootprint) return <div>Loading...</div>;

return (
  <div>
    {console.log('Rendering quests')}
    {quests.map((quest) => {
      if (quest.category && userCarbonFootprint.hasOwnProperty(`${quest.category}Emissions`)) {
        console.log('Quest with valid category:', quest);
        return (
          <QuestCard
            key={quest.id}
            quest={quest}
            userCarbonFootprint={userCarbonFootprint}
          />
        );
      } else {
        console.log('Quest with invalid category or missing emissions:', quest, userCarbonFootprint); // Add this line
        return null;
      }
    })}
  </div>
);
};

export default Quests;
