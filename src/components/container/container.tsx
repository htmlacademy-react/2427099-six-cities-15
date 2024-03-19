import { ReactNode } from 'react';
import classNames from 'classnames';
import Header from '../header/header';

type TContainerProps = {
  isLoginNav: boolean;
  children: ReactNode;
  extraClass?: string;
  classMain?: string;
}

function Container({ isLoginNav, children, extraClass, classMain }: TContainerProps): JSX.Element {
  return (
    <div className={classNames('page', extraClass)}>
      <Header isLoginNav={isLoginNav}/>
      <main className={classNames('page__main', classMain)}>
        {children}
      </main>
    </div>
  );
}

export default Container;
