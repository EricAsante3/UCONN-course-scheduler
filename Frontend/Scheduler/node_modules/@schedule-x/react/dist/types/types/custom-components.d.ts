import { ReactElement } from 'react';
export type CustomComponentMeta = {
    Component: ReactElement;
    wrapperElement: HTMLElement;
};
export type CustomComponentsMeta = CustomComponentMeta[];
