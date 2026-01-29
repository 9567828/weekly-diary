export interface IParams {
  params: Promise<{ id: string }>;
}

export interface ISearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
