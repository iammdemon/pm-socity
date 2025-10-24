import { Router } from "express";
import { UserRoutes } from "../modules/users/route.users";
import { ForumRoutes } from "../modules/dicussions/route.discussions";
import { blogRoutes } from "../modules/blogs/route.blog";
import { EventRoutes } from "../modules/events/route.events";
import { ResourceRoutes } from "../modules/resources/route.resources";
import { chatRoutes } from "../modules/chat/route.chat";
import { AuthRoutes } from "../modules/auth/route.auth";
import { ContactRoutes } from "../modules/contact/route.contact";
import { mailchimpRoutes } from "../modules/mailchimp/route";
import { GoalRoutes } from "../modules/goal/route.goal";
import { AchievementRoutes } from "../modules/achievement/route.achievement";
import { searchRoutes } from "../modules/search/route.search";

const router: Router = Router();

const moduleRoutes = [
  { path: "/users", route: UserRoutes },
  { path: "/forums", route: ForumRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/blogs", route: blogRoutes },
  { path: "/events", route: EventRoutes },
  { path: "/resources", route: ResourceRoutes },
  { path: "/chat", route: chatRoutes },
  { path: "/contact", route: ContactRoutes },
  { path: "/subscribe", route: mailchimpRoutes },
  { path: "/goals", route: GoalRoutes },
  { path: "/achievements", route: AchievementRoutes },
  {path:"/search", route: searchRoutes}
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
