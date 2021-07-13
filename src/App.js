import logo from './logo.svg';
import './App.css';
import PageWraper from './Pages/pagewraper';
import About from './Components/about/about';
import CardCreator from './Components/cardCreator/carCreator';

function App() {
  return (
    <div className="App">
      <PageWraper>
        <About></About>
        <CardCreator></CardCreator>
      </PageWraper>
    </div>
  );
}

export default App;
