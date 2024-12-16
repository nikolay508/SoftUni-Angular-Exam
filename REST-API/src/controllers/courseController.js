import { Router } from "express";
import courseService from "../services/courseService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const courseController = Router();

courseController.get("/courses", async (req, res) => {
  try {
    const courses = await courseService.getAll();
    res.json(courses);
  } catch (err) {
    const error = getErrorMessage(err);
    res.status(500).json({ message: error });
  }
});

courseController.post("/create", async (req, res) => {
  try {
    const userId = req.cookies.auth.user._id;

    const courseData = {
      ...req.body,
      ownerId: userId,
    };

    const course = await courseService.create(courseData, userId);
    res.status(201).json(course); // Changed to 201 for successful creation
  } catch (err) {
    const error = getErrorMessage(err);
    res.status(500).json({ message: error });
  }
});

courseController.get("/courses/:courseId", async (req, res) => {
  try {
    const course = await courseService.getOne(req.params.courseId);
    res.json(course);
  } catch (err) {
    const error = getErrorMessage(err);
    res.status(500).json({ message: error });
  }
});

courseController.delete("/courses/:courseId/delete", async (req, res) => {
  try {
    await courseService.delete(req.params.courseId);
    res.status(204).end();
  } catch (err) {
    const error = getErrorMessage(err);
    res.status(500).json({ message: error });
  }
});

courseController.put("/courses/:courseId", async (req, res) => {
  try {
    const courseData = req.body;
    const courseId = req.params.courseId;

    const updatedData = await courseService.update(courseId, courseData);
    res.json(updatedData);
  } catch (err) {
    const error = getErrorMessage(err);
    res.status(500).json({ message: error });
  }
});

courseController.put('/courses/:courseId/sign', async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.cookies.auth.user._id;

  console.log(courseId, userId);
  
  try {
    const course = await courseService.sign(courseId, userId);

    res.status(200).json(course).end();
  } catch (err) {
    const error = getErrorMessage(err);
    res.status(500).json({ message: error });
  }
});

export default courseController;
