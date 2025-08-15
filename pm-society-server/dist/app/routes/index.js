"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route_users_1 = require("../modules/users/route.users");
const route_discussions_1 = require("../modules/dicussions/route.discussions");
const route_blog_1 = require("../modules/blogs/route.blog");
const route_events_1 = require("../modules/events/route.events");
const route_resources_1 = require("../modules/resources/route.resources");
const route_chat_1 = require("../modules/chat/route.chat");
const route_auth_1 = require("../modules/auth/route.auth");
const router = (0, express_1.Router)();
const moduleRoutes = [{
        path: "/users",
        route: route_users_1.UserRoutes,
    }, {
        path: "/forums",
        route: route_discussions_1.ForumRoutes
    },
    {
        path: "/auth",
        route: route_auth_1.AuthRoutes
    },
    {
        path: "/blogs",
        route: route_blog_1.blogRoutes
    },
    {
        path: "/events",
        route: route_events_1.EventRoutes
    },
    {
        path: "/resources",
        route: route_resources_1.ResourceRoutes
    },
    {
        path: "/chat",
        route: route_chat_1.chatRoutes
    }];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
