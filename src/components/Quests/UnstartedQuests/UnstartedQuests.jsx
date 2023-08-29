// UnstartedQuest.jsx:

import React, { useState } from "react";
import { Grid, Pagination, Typography } from "@mui/material/";
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
  const [currentPage, setCurrentPage] = useState(1);
  const questsPerPage = 9;

  const indexOfLastQuest = currentPage * questsPerPage;
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage;
  const currentQuests = unstartedQuests.slice(
    indexOfFirstQuest,
    indexOfLastQuest
  );

  return (
    <>
      <Typography variant="h4">Next quests</Typography>
      <Grid container>
        {currentQuests.length > 0 ? (
          currentQuests.map((quest) => {
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
      <Pagination
        count={Math.ceil(unstartedQuests.length / questsPerPage)}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        sx={{ mt: 3, display: "flex", justifyContent: "center" }}
      />
    </>
  );
};

export default UnstartedQuests;
