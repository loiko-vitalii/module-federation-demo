/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  readonly PUBLIC_YOUTUBE_DATA_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
