import { AppBar } from 'appbar';
import { Feed } from 'feed';

import { appbar } from './styles.module.css';

export const App = () => (
  <>
    <title>Title</title>
    <AppBar className={appbar} />
    <Feed />
  </>
);
