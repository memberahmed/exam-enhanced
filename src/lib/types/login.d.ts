declare type User = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
};

declare type LoginResponse = {
  message: "success";
  token: string;
  user: User;
};
