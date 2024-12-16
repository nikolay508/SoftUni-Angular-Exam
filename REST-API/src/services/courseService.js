import Course from "../models/Course.js"

const courseService = {
    getAll() {
        return Course.find();
    },
    getOne(courseId) {
        return Course.findById(courseId);
    },
    create(courseData, userId) {
        return Course.create({ ...courseData, _ownerId: userId });
    },
    delete(courseId) {
        return Course.findByIdAndDelete(courseId);
    },
    update(courseId, courseData) {
        return Course.findByIdAndUpdate(courseId, courseData);
    },
    sign(courseId, userId) {
        return Course.findByIdAndUpdate(courseId, { $addToSet: { signedOut: userId, new: true } });
    },

}

export default courseService;