export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

//Data models interfaces 
export interface IListCards {
    items: HTMLElement[],
}

export interface IOffer {
    id: string,
    title: string,
    src: string,
    href: string,
    description: string,
    items: IOfferItem[]
}

export interface IOfferItem {
    id: string,
    title: string,
    src: string,
    alt: string,
    description: string,
    hit: boolean,
}

export interface ICategory {
    id: string,
    title: string,
    src: string,
    href: string,
    description: string,
    categoryOffers: IOffer[]
}

export interface IPopularItem extends IOfferItem {
    index: string
}

