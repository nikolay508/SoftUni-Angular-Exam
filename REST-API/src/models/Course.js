import { Schema, Types, model } from "mongoose";

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
    minLength: [2, "Title must be at least 2 characters long!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    minLength: [10, "Description must be at least 10 characters long!"],
    maxLength: [100, "Description must be no longer than 100 characters!"],
  },
  startDate: {
    type: String,
    required: [true, "Start date is required!"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image is required!"],
    validate: [/^https?:\/\//, 'Invalid image URL!'],
  },
  price: {
    type: String,
    required: [true, "Price is required!"],
    min: 0,
  },
  signedOut: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  _ownerId: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Course = model("Course", courseSchema);

export default Course;
