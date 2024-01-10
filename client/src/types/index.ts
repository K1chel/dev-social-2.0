export interface IUser {
  _id: string;
  username: string;
  email: string;
  bio?: string | null;
  avatar?: string | null;
  followers: IUser[];
  following: IUser[];
  liked: IPost[];
  saved: IPost[];
  createdAt: string;
  updatedAt: string;
}

export interface IPost {
  id: string;
  body: string;
}
