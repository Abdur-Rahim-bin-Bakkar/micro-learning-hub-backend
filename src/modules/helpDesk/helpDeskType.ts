export interface ICreateHelpDeskPost {
  userId: string;
  issue: string;
  description: string;
  image: string;
  name: string;
  uimage: string
}

export interface IComment {
  userId: string;
  comment: string;
  createdAt: Date;
}

export interface IReaction {
  like: string[];
  love: string[];
  necessary: string[];
}
export interface IComment {
  userId: string;
  name: string;
  photo: string;
  comment: string;
  createdAt: Date;
}