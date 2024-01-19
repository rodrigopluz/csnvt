interface IPaginationProps {
  count: number;
  page: number;
  limit?: number;
  onChange: (page: number) => void;
}

export { IPaginationProps };
