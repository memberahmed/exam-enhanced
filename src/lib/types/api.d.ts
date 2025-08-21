declare type SuccessfullResponse<T> = {
  message: "success";
} & T;

declare type ErrorResponse = {
  message: string;
  code: number;
};
declare type MetaData = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
  prevPage: number;
};

declare type PaginatedResponse<T> = {
  message: "success";
  metadata: MetaData;
} & T;

declare type ApiResponse<T> = ErrorResponse | SuccessfullResponse<T>;
