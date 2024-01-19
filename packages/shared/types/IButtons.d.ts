interface IButtonsProps {
  filterPort: (category: string) => void;
  menuFilter: {
    name: string;
    category: string;
  }[];
  setFilter: (dataPorts: any) => void;
}

export { IButtonsProps };
