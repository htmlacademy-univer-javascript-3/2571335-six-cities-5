import MainPageCards from './MainPageCards.tsx';
import MainPage from './MainPage.tsx';


type MainPageCardsProps={
    premium:boolean[];
    img:string[];
    price:number[];
    apartsmentType:string[];
    description:string[];
    numberOfPlaces:number;
}


function App({premium, img, price, apartsmentType, description, numberOfPlaces}:MainPageCardsProps):JSX.Element{

    return(
        <MainPage numberOfPlaces={numberOfPlaces}>
        <MainPageCards premium={premium[0]} img = {img[0]} price = {price[0]} apartsmentType = {apartsmentType[0]} description = {description[0]}/>
        <MainPageCards premium={premium[1]} img = {img[1]} price = {price[1]} apartsmentType = {apartsmentType[1]} description = {description[1]}/>
        <MainPageCards premium={premium[2]} img = {img[2]} price = {price[2]} apartsmentType = {apartsmentType[2]} description = {description[2]}/>
        <MainPageCards premium={premium[3]} img = {img[3]} price = {price[3]} apartsmentType = {apartsmentType[3]} description = {description[3]}/>
        
        </MainPage>
    );

}
export default App;