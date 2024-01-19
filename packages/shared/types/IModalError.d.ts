interface ModalErrorProps {
  title: string;
  message: string;
  error: boolean;
  setError: (value: boolean) => void;
}

export { ModalErrorProps };
