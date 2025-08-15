
import catchAsync from "../../utils/catchAsync";
import { ForumService } from "./service.discussions";


// Create topic
const createTopic = catchAsync(async (req, res) => {
  const result = await ForumService.createTopic(req.body);
  res.status(201).json({
    message: "Topic created successfully",
    data: result,
  });
});

// Get all topics
const getAllTopics = catchAsync(async (req, res) => {
  const result = await ForumService.getAllTopics();
  res.status(200).json({
    message: "Topics fetched successfully",
    data: result,
  });
});

// Get single topic
const getSingleTopic = catchAsync(async (req, res) => {
  const slug = req.params.slug;
  const result = await ForumService.getSingleTopic(slug);
  if (!result) {
    res.status(404).json({ error: "Topic not found" });
    return;
  }
  res.status(200).json({
    message: "Topic fetched successfully",
    data: result,
  });
});

// Create message
const createMessage = catchAsync(async (req, res) => {
  const topicId = req.params.topicId;
  const result = await ForumService.createMessage(topicId, req.body);
  res.status(201).json({
    message: "Message added successfully",
    data: result,
  });
});

// Get all messages by topic
const getMessagesByTopic = catchAsync(async (req, res) => {
  const topicId = req.params.topicId;
  const result = await ForumService.getMessagesByTopic(topicId);
  res.status(200).json({
    message: "Messages fetched successfully",
    data: result,
  });
});

const deleteTopic = catchAsync(async (req, res) => {
    try {
        const slug = req.params.slug;
        console.log(slug)
        const result = await ForumService.deleteTopic(slug);
        console.log(result)
        if (!result) {
            res.status(404).json({ error: "Topic not found" });
            return;
        }
        res.status(200).json({
            message: "Topic deleted successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error deleting Topic:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export const ForumController = {
  createTopic,
  getAllTopics,
  getSingleTopic,
  createMessage,
  getMessagesByTopic,
  deleteTopic
};
