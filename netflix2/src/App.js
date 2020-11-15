
import './App.css';
import Row from './Row';
import request from './request';
import './Row.css'
import Banner from './Banner'
import Nav from './Nav';




function App() {
  return (
    <div className="App">
      
      
      <Nav/>
      <Banner/>
      <Row className = "large" title = "NETFLIX ORIGNALS" fetchUrl = {request.fetchNetflixOriginals} isLargeRow = {true}/>
      <Row title = "Trending Now" fetchUrl = {request.fetchTrending} />
      <Row title = "Top Rated" fetchUrl = {request.fetchTopRated} />
      <Row title = "Action Movies" fetchUrl = {request.fetchActionMovies} />
      <Row title = "Comedy Movies" fetchUrl = {request.fetchComedyMovies} />
      <Row title = "Romantic Movies" fetchUrl = {request.fetchRomanceMovies} />
      <Row title = "Horror Movies" fetchUrl = {request.fetchHorrorMovies} />
      <Row title = "Documentries" fetchUrl = {request.fetchDocumentaries} />
    </div>
  );
}

export default App;
