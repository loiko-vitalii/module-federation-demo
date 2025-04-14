import { Skeleton, Typography } from 'uikit/components';

import {
  videoAuthor,
  videoCard,
  videoCardFooter,
  videoCardThumbnail,
  videoLink,
  videoPublishedAt,
  videoViews,
} from './styles.module.css';

export const VideoCardSkeleton = () => (
  <div className={videoLink}>
    <article className={videoCard}>
      <Skeleton>
        <img src="" alt="" className={videoCardThumbnail} />
      </Skeleton>
      <header>
        <Skeleton>
          <Typography variant="h3" lines={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, adipisci asperiores corporis cupiditate
            dignissimos eius, est ex expedita in libero maxime mollitia necessitatibus nesciunt odio omnis placeat
          </Typography>
        </Skeleton>
      </header>
      <footer className={videoCardFooter}>
        <Skeleton className={videoAuthor}>
          <Typography lines={1} color="grey">
            Author
          </Typography>
        </Skeleton>
        <Skeleton className={videoViews}>
          <Typography lines={1} color="grey">
            9999999
          </Typography>
        </Skeleton>
        <Skeleton className={videoPublishedAt}>
          <Typography lines={1} color="grey">
            2 days ago
          </Typography>
        </Skeleton>
      </footer>
    </article>
  </div>
);
