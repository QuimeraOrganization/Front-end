import axios from "../config/axios";

async function createFeedback(contents, productId, userId) {
  const feedback = await axios.post("/feedbacks", {
    contents,
    productId,
    userId,
  });
  return feedback.data;
}
async function deleteFeedback(id) {
  return await axios.delete(`/feedbacks/${id}`);
}

async function getFeedbacks() {
  const feedbacks = await axios.get("/feedbacks");
  return feedbacks.data;
}

async function updateFeedback(id, contents, userId, productId) {
  const feedback = await axios.put(`/feedbacks/${id}`, {
    contents,
    userId,
    productId,
  });
  return feedback.data;
}

async function getFeedbackById(id) {
  const feedbacks = await axios.get(`/feedbacks/${id}`);
  return feedbacks.data;
}

export {
  createFeedback,
  deleteFeedback,
  getFeedbacks,
  updateFeedback,
  getFeedbackById,
};
