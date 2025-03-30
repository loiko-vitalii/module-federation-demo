import { clsx } from 'clsx';

import { Typography } from 'uikit/components';
import type { StyleOverrides } from 'uikit/types';

import type { Video } from '../../types';
import {
  videoAuthor,
  videoCard,
  videoCardFooter,
  videoCardThumbnail,
  videoLink,
  videoPublishedAt,
  videoViews,
} from './styles.module.css';

export interface Props extends Omit<Video, 'id'>, StyleOverrides {}

export const VideoCard = ({ title, thumbnail, author, views, publishedAt, url, className }: Props) => (
  <a href={url} className={clsx(videoLink, className)} target="_blank" rel="noreferrer">
    <article className={videoCard}>
      <img src={thumbnail} alt={title} className={videoCardThumbnail} />
      <header>
        <Typography variant="h3" lines={2}>
          {title}
        </Typography>
      </header>
      <footer className={videoCardFooter}>
        <Typography lines={1} color="grey" className={videoAuthor}>
          {author}
        </Typography>
        <Typography lines={1} color="grey" className={videoViews}>
          {views}
        </Typography>
        <Typography lines={1} color="grey" className={videoPublishedAt}>
          {publishedAt}
        </Typography>
      </footer>
    </article>
  </a>
);
