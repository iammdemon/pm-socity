

export interface IForumTopic {
  title: string;
  slug: string;
}

export interface IForumMessage {
  topicId: string;
  userName: string;
  message: string;
}