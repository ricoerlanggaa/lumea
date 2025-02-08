import store from '@/store';

export type StoreApp = ReturnType<typeof store>;
export type StoreState = ReturnType<StoreApp['getState']>;
export type StoreDispatch = StoreApp['dispatch'];
