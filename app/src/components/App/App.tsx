import { AppBar } from 'appbar';
import { Feed } from 'feed';

import { appbar } from './styles.module.css';

export const App = () => (
  <>
    <AppBar className={appbar} />
    <Feed />
  </>
);
