import type { RouteObject } from 'type-safe-react-router';

import { Books } from './components/Books';
import { Book } from './components/Book';
import { Chapters } from './components/Chapters';
import { Chapter } from './components/Chapter';
import { Author } from './components/Author';

export const routes = [
  {
    slug: 'books',
    path: '/',
    element: <Books />,
    children: [
      {
        slug: 'book',
        path: 'book/:bookId',
        element: <Book />,
        children: [
          {
            slug: 'chapters',
            path: 'chapters',
            element: <Chapters />,
            children: [
              {
                slug: 'chapter',
                path: ':chapterId',
                element: <Chapter />,
              },
            ],
          },
          {
            slug: 'author',
            path: 'author',
            element: <Author />,
          },
        ],
      },
    ],
  },
] as const satisfies RouteObject[];
