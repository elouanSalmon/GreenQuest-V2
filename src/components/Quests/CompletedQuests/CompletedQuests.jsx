import React from "react";
import { Grid, Typography, Divider } from "@mui/material/";
import QuestCard from "../QuestCard/QuestCard";

const CompletedQuests = ({
  completedQuests,
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
      <Typography variant="h4">Completed</Typography>
      <Grid container>
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
      <Divider style={{ marginBottom: "15px" }} />
    </>
  );
};

export default CompletedQuests;
