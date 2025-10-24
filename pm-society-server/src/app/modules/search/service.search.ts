import { ForumTopic } from "../dicussions/model.discussions";
import Event from "../events/model.events";
import { Resource } from "../resources/model.resources";
import { User } from "../users/model.users";

const searchAll = async (query: string) => {
  if (!query || query.trim() === "") {
    return { users: [], posts: [], resources: [], events: [] };
  }

  const queryRegex = new RegExp(query, "i"); // case-insensitive search

  const [users, posts, resources, events] = await Promise.all([
    User.find({
      $or: [{ name: queryRegex }, { userName: queryRegex }, { bio: queryRegex }],
    })
      .select("name userName avatar bio")
      .limit(5),

    ForumTopic.find({ content: queryRegex })
      .populate("author", "name userName avatar")
      .select("content createdAt")
      .limit(5),

    Resource.find({
      $or: [{ title: queryRegex }, { description: queryRegex }, { tags: queryRegex }],
    })
      .select("title description link tags")
      .limit(5),

    Event.find({
      $or: [{ title: queryRegex }, { description: queryRegex }],
    })
      .select("title description date location")
      .limit(5)
      .catch(() => []), // handles missing Event model gracefully
  ]);

  return { users, posts, resources, events };
};

export const searchService = {
  searchAll,
};
