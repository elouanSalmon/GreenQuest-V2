// src/QuestForm.js
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const QuestForm = () => {
  const [questData, setQuestData] = useState({
    title: '',
    description: '',
    category: '',
    target_carbon_consumption: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const questCollection = collection(db, 'quests');
      await addDoc(questCollection, questData);
      alert('Quest created successfully');
      setQuestData({
        title: '',
        description: '',
        category: '',
        target_carbon_consumption: '',
        image: '',
      });
    } catch (error) {
      console.error('Error creating quest:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        name="title"
        value={questData.title}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="description"
        value={questData.description}
        onChange={handleChange}
        fullWidth
        multiline
        required
      />
      <TextField
        label="Category"
        name="category"
        value={questData.category}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Target Carbon Consumption"
        name="target_carbon_consumption"
        value={questData.target_carbon_consumption}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Image"
        name="image"
        value={questData.image}
        onChange={handleChange}
        fullWidth
        required
      />
      <Button type="submit" color="primary" variant="contained">
        Create Quest
      </Button>
    </form>
  );
};

export default QuestForm;
