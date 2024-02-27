// This file was auto-generated. DO NOT EDIT!
import * as r from 'type-safe-react-router';
import type { RouteObject } from "type-safe-react-router";
const routes = [
    {
        slug: "books",
        path: "/",
        element: null,
        children: [
            {
                slug: "book",
                path: "book/:bookId",
                element: null,
                children: [
                    {
                        slug: "chapters",
                        path: "chapters",
                        element: null,
                        children: [
                            {
                                slug: "chapter",
                                path: ":chapterId",
                                element: null,
                            },
                        ],
                    },
                    {
                        slug: "author",
                        path: "author",
                        element: null,
                    },
                ],
            },
        ],
    },
] as const satisfies RouteObject[];

export const paths = r.makePaths(routes);
