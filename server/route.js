import express from "express";
import { ToDo } from "./schema.js";
const app = express.Router();

// API for creating
app.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newToDo = new ToDo({
      title,
      description,
    });

    await newToDo.save();
    res.status(201).json({
      message: "ToDo created",
    });
  } catch (error) {
    console.log(error);
  }
});

// API for getting data

app.get("/", async (req, res) => {
  try {
    const data = await ToDo.find();
    res.status(200).json({ message: "Data found", data });
  } catch (error) {
    console.log(error);
  }
});

// API for deleting data

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await ToDo.findByIdAndDelete(id);

    if (!deletedItem) {
      res.status(404).json({
        message: "ToDo not found",
      });
    }

    res.status(200).json({
      message: "To-Do deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

// API for updating data

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedItem = await ToDo.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItem) {
      res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({ message: "Item updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

export default app;
