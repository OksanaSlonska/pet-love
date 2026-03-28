export interface INotice {
  _id: string;
  species: string;
  category: string;
  title: string;
  name: string;
  birthday: string;
  sex: string;
  imgURL: string;
  popularity: number;
  comment: string;
  price?: number;
}

export interface Pet {
  _id: string;
  name: string;
  birthday: string;
  sex: string;
  species: string;
  imgURL: string;
}

export interface User {
  name: string | null;
  email: string | null;
  favorites: string[];
  pets: Pet[];
  avatarURL?: string;
  phone?: string;
}

export interface AuthResponse {
  user?: User;
  token?: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  pets?: Pet[];
  noticesFavorites?: string[];
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password?: string;
}

export interface AddPetResponse {
  pets: Pet[];
}

export interface UpdateUserResponse {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}
