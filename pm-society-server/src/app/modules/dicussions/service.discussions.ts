import { IForumMessage, IForumTopic } from "./interface.discussions";
import { ForumMessage, ForumTopic } from "./model.discussions";


const createTopic = async (payload: IForumTopic) => {
  return await ForumTopic.create(payload);
};

const getAllTopics = async () => {
  return await ForumTopic.find().sort({ createdAt: -1 });
};

const getSingleTopic = async (slug: string) => {
  return await ForumTopic.findOne({ slug });
};

const createMessage = async (topicId: string, payload: IForumMessage) => {
  return await ForumMessage.create({ ...payload, topicId });
};

const getMessagesByTopic = async (topicId: string) => {
  return await ForumMessage.find({ topicId }).sort({ createdAt: 1 });
};

const deleteTopic = async (slug: string)=>{
 return await ForumTopic.findOneAndDelete({slug})
 
}

export const ForumService = {
  createTopic,
  getAllTopics,
  getSingleTopic,
  createMessage,
  getMessagesByTopic,
  deleteTopic
};
