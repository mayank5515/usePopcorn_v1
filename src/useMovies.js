import { useState, useEffect } from "react";
export function useMovies(query, apiKey) {
  //CUSTOM HOOK
  //whenever we write a query we get our movies list as query is changed inside this useEffect so it will be called whenver state changes
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovieAPI() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("⛔ Something went wrong with fetching movies");

          const data = await res.json();

          // console.log("data is ", data);

          if (data.Response === "False") throw new Error("Movies not found ☹️");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          // console.log(err);
          // console.error(Error(err.message ?? err));
          // setMovies("Movies not found");
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 1) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovieAPI();

      return function () {
        controller.abort();
      };
    },
    [query, apiKey, Error]
  );
  return { movies, isLoading, Error };
}
