interface IShipsProps {
  imo: number;
  name: string;
  email: string;
  phone: string;
  link: string;
  ships_owners?: [
    {
      id: number;
      name: string;
      email: string;
      phone: string;
      ships_imo: number;
    },
  ];
}

interface IShips {
  imo: number;
  name: string;
  email: string;
  phone: string;
  link: string;
}

export { IShipsProps, IShips };
