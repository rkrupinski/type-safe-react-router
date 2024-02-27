import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Chapters: FC = () => (
  <>
    <h3>Chapters</h3>
    <Outlet />
  </>
);
