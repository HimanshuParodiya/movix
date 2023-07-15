import { useEffect } from "react";
import "./App.css";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration } from "./store/homeSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.home.url);
  console.log(url);

  useEffect(() => {
    // api testing are we getting the response or not
    fetchDataFromApi("/movie/popular").then((res) => {
      // console.log(res);
      dispatch(getApiConfiguration(res));
    });
  }, []);

  return (
    <>
      <div className="app">Hello</div>
    </>
  );
}

export default App;
