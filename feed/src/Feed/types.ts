export type Video = {
  id: string;
  title: string;
  author: string;
  views: number;
  publishedAt: string;
  thumbnail: string;
  url: string;
};

export type SearchVideo = {
  id: {
    videoId: string;
  };
};

export type ListVideo = {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: number;
  };
};

export type ApiVideoResponse<T> = { items: T[]; nextPageToken: string };

export type ApiSearchVideoResponse = ApiVideoResponse<SearchVideo>;

export type ApiVideoListResponse = ApiVideoResponse<ListVideo>;
