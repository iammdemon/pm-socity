import { ForumTopic } from "../dicussions/model.discussions";
import Event from "../events/model.events";
import { Resource } from "../resources/model.resources";
import { User } from "../users/model.users";

const searchAll = async (query: string) => {
  const trimmedQuery = query?.trim();
  if (!trimmedQuery) {
    return { users: [], posts: [], resources: [], events: [] };
  }

  const queryRegex = new RegExp(trimmedQuery, "i");

  const [users, posts, resources, events] = await Promise.all([
    // 👇 No .select() — returns full user docs
    User.find({
      $or: [{ name: queryRegex }, { userName: queryRegex }, { bio: queryRegex }],
    })
      .limit(5)
      .catch(() => []),

    // 👇 Full forum topic (with populated author)
    ForumTopic.find({ content: queryRegex })
      .populate("author", "name userName") // full author data
      .limit(5)
      .catch(() => []),

    // 👇 Full resource documents
    Resource.find({
      $or: [{ title: queryRegex }, { description: queryRegex }, { tags: queryRegex }],
    })
      .limit(5)
      .catch(() => []),

    // 👇 Full event documents
    Event.find({
      $or: [{ title: queryRegex }, { description: queryRegex }],
    })
      .limit(5)
      .catch(() => []),
  ]);

  return { users, posts, resources, events };
};

export const searchService = { searchAll };
