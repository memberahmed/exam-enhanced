declare type SuccessfullResponse<T> = {
  message: "success";
} & T;

declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type ApiResponse<T> = ErrorResponse | SuccessfullResponse<T>;
