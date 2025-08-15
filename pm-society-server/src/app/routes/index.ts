import { Router } from "express";
import { UserRoutes } from "../modules/users/route.users";
import {ForumRoutes } from "../modules/dicussions/route.discussions";

import { blogRoutes } from "../modules/blogs/route.blog";
import { EventRoutes } from "../modules/events/route.events";
import { ResourceRoutes } from "../modules/resources/route.resources";
import { chatRoutes } from "../modules/chat/route.chat";
import { AuthRoutes } from "../modules/auth/route.auth";

const router: Router = Router();

const moduleRoutes = [{
    path: "/users",
    route: UserRoutes,
},{
    path: "/forums",
    route: ForumRoutes
},
{
    path: "/auth",
    route: AuthRoutes
},

{
    path: "/blogs",
    route: blogRoutes
},
{
    path: "/events",
    route: EventRoutes
},
{
    path: "/resources",
    route: ResourceRoutes
},
{
    path: "/chat",
    route: chatRoutes
}]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;