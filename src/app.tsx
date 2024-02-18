import MainPage from './pages/main-page/main-page';

export default function App(): JSX.Element {
  return (
    <MainPage cards={Array.from({length: 4}, () => '')} />
  );
}
