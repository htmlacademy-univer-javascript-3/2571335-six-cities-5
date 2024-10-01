import MainPage from './MainPage.tsx';
import {mainPageTypes} from '../../src/index.tsx';


function App({ MainPageCardProps }: { MainPageCardProps: mainPageTypes[] }): JSX.Element {

    return(
        <MainPage MainPageCardProps={MainPageCardProps}  />
    );

}
export default App;