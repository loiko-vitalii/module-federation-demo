import { type PropsWithChildren } from 'react';
type Color = 'black' | 'grey' | 'blue';
export interface Props extends PropsWithChildren {
    lines?: number;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    color?: Color;
    className?: string;
}
export declare const Typography: ({ variant, color, lines, className, children }: Props) => import("react").ReactElement<{
    className: string;
    style: {
        '--lines': number | undefined;
    };
}, string | import("react").JSXElementConstructor<any>>;
export {};
