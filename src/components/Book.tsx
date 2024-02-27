import type { FC } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Link } from 'type-safe-react-router';

import { paths } from '../paths';

export const Book: FC = () => {
  const { bookId } = useParams<'bookId'>();

  return (
    <>
      <h2>Book</h2>
      {bookId && <Link to={paths.author({ bookId })}>View author</Link>}
      <Outlet />
    </>
  );
};
