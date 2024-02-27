import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate } from 'type-safe-react-router';

import { paths } from '../paths';

export const Books: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Books</h1>
      <ul>
        <li>
          <Link to={paths.book({ bookId: 'A' })}>Book A</Link>
        </li>
        <li>
          <button
            onClick={() => {
              navigate({
                pathname: paths.book({ bookId: 'B' }),
              });
            }}
          >
            Book B
          </button>
        </li>
      </ul>
      <Outlet />
    </>
  );
};
