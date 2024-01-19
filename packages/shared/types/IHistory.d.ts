interface IHistory {
  id?: number;
  historic: string;
  ships_imo?: number;
}

interface IHistoryProps {
  hitIMO: string;
  setHitIMO: React.Dispatch<React.SetStateAction<string>>;
  hitShips: string;
  setHitShips: React.Dispatch<React.SetStateAction<string>>;
}

export { IHistory, IHistoryProps };
