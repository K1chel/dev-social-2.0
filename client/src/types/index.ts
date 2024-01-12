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
  _id: string;
  postedBy: IUser;
  text: string;
  image?: string | null;
  likes: IUser[];
  saves: IUser[];
  replies: any[];
  createdAt: string;
  updatedAt: string;
}
