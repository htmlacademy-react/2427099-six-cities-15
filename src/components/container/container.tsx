import { ReactNode } from 'react';
import classNames from 'classnames';
import Header from '../header/header';

type TContainerProps = {
  children: ReactNode;
  extraClass?: string;
  classMain?: string;
}

export default function Container({ children, extraClass, classMain }: TContainerProps): JSX.Element {
  return (
    <div className={classNames('page', extraClass)}>
      <Header />
      <main className={classNames('page__main', classMain)}>
        {children}
      </main>
    </div>
  );
}
