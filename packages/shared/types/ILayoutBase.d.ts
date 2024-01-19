import { ReactNode } from 'react';

interface ILayoutBaseProps {
  title: string;
  rota?: string;
  loggedUser: any;
  subTitle?: string;
  toolbar?: ReactNode;
  children?: ReactNode;
}

export { ILayoutBaseProps };
