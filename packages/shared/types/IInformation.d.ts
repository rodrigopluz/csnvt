interface IInformations {
  id?: number;
  info: string;
  datainfo: string;
  ships_imo?: number;
}

interface IInformationProps {
  infoIMO: string;
  setInfoIMO: React.Dispatch<React.SetStateAction<string>>;
  infoShips: string;
  setInfoShips: React.Dispatch<React.SetStateAction<string>>;
}

export { IInformations, IInformationProps };
