/// <reference types="@rsbuild/core/types" />
declare const PUBLIC_YOUTUBE_DATA_API_KEY: string;

interface ImportMetaEnv {
  readonly PUBLIC_YOUTUBE_DATA_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
