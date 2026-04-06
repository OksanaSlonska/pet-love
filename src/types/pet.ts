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
  user?: {
    _id: string;
    email: string;
    phone: string;
  };
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

  avatar?: string;
  noticesViewed: string[];
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
  avatarURL?: string;
}

export interface UpdateUserValues {
  name: string;
  email: string;
  phone: string;
  avatar: string | File;
}

export interface PetFormValues {
  title: string;
  name: string;
  birthday: string;
  species: string;
  sex: string;
  imgURL: File | string;
}

export interface PetResponse {
  _id: string;
  name: string;
  title: string;
  birthday: string;
  species: string;
  sex: string;
  imgURL: string;
  createdAt?: string;
  updatedAt?: string;
}
