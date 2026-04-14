export interface Player {
  _id: string;
  fullname: string;
  firstname: string;
  lastname: string;
  number: string;
  nationality: string;
  birth: string;
  img: string;
  position: string;
  bio: {
    background: string,
    placeBirth: string,
    height: number,
    information: string
  }
}