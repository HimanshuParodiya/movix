import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import SearchResult from "./pages/SearchResult/SearchResult";
import Explore from "./pages/Explore/Explore";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import FavMovie from "./pages/FavMovies/FavMovie";
import { setMovieLength } from "./store/LikeSlice";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);
  // console.log(url);

  // now in every component everytime to call an api we have to use this below useEffect but we can create a customHook for that
  useEffect(() => {
    // api testing are we getting the response or not
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      // console.log(res);
      dispatch(getApiConfiguration(url));
    });

    getAllGenres();

    let favMovieLength = JSON.parse(localStorage.getItem("LikedMovie"));
    dispatch(setMovieLength(favMovieLength.length));
  }, []);

  const getAllGenres = async () => {
    let promises = [];
    let genresFor = ["tv", "movie"];
    let allGeners = {};

    genresFor.forEach((endPoint) => {
      promises.push(fetchDataFromApi(`/genre/${endPoint}/list`));
    });

    const data = await Promise.all(promises); // promise.all wait to resolve passed array then run
    // console.log(data);
    data.map(({ genres }) => {
      // destructuring genres form data array
      return genres.map((item) => (allGeners[item.id] = item)); // add key value pair in allGenres object key is id and value is object of genres
    });
    // console.log(allGeners);
    dispatch(getGenres(allGeners)); // now we have stored all the genres in our store
  };

  return (
    <>
      <div className="app">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:mediaType/:id" element={<Details />} />
            <Route path="/search/:query" element={<SearchResult />} />
            <Route path="/explore/:mediaType" element={<Explore />} />
            <Route path="/favMovies" element={<FavMovie />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
