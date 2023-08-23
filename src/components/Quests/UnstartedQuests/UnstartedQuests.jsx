//UnstartedQuest.jsx:

import React from "react";
import { Grid } from "@mui/material/";
import QuestCard from "../QuestCard/QuestCard";

const UnstartedQuests = ({
  unstartedQuests,
  userCarbonFootprint,
  getTargetEmissions,
  handleOpen,
  handleComplete,
  handleStart,
  handleCancel,
  startedQuests,
}) => {
  return (
    <>
      <h2>Available quests</h2>
      <Grid container>
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
    </>
  );
};

export default UnstartedQuests;
