import React from "react";
import { Grid, Typography } from "@mui/material/";
import QuestCard from "../QuestCard/QuestCard";

const ActiveQuests = ({
  activeQuests,
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
      <Typography color="customBlue" variant="h4">
        In progress
      </Typography>
      <Grid container>
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
    </>
  );
};

export default ActiveQuests;
