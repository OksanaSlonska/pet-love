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
