
    export type RemoteKeys = 'uikit/components' | 'uikit/types';
    type PackageType<T> = T extends 'uikit/types' ? typeof import('uikit/types') :T extends 'uikit/components' ? typeof import('uikit/components') :any;