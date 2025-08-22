declare type Diploma = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
};

declare type DiplomasResponse = {
  subjects: Diploma[];
};
