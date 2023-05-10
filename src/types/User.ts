export interface User {
  _id: string;
  email: string;
  fullname: string;
  nickname: string;
  avatar: string;
  is_show_info: boolean;
  rank: string;
  dedication_score: number;
}

export interface RequestUpdateUser {
  nickname?: string;
}
