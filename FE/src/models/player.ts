export interface Player {
  _id: string;
  fullname: string;
  firstname: string;
  lastname: string;
  number: string;
  nationality: {
    id: string;
    link: string;
  };
  birth: string;
  img: {
    id: string;
    link: string;
  };
  position: string;
  bio: {
    background: {
      id: string;
      link: string;
    },
    placeBirth: string,
    height: number,
    information: string
  }
}