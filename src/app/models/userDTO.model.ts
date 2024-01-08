export interface UserDTO {
  id?: number;
  first_name: string;
  last_name: string;
  nickname: string;
  email: string;
  date_naissance: Date;
  Genre: string;
  roles: string[];
  postIds: number[];

}
