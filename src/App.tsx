import type { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { routes } from './routes';

const router = createBrowserRouter(routes);

export const App: FC = () => <RouterProvider router={router} />;
