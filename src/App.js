// import { useEffect, useState } from "react";
// import StarRating from "./StarRating";

// // const tempMovieData = [
// //   {
// //     imdbID: "tt1375666",
// //     Title: "Inception",
// //     Year: "2010",
// //     Poster:
// //       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
// //   },
// //   {
// //     imdbID: "tt0133093",
// //     Title: "The Matrix",
// //     Year: "1999",
// //     Poster:
// //       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
// //   },
// //   {
// //     imdbID: "tt6751668",
// //     Title: "Parasite",
// //     Year: "2019",
// //     Poster:
// //       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
// //   },
// // ];

// // const tempWatchedData = [
// //   {
// //     imdbID: "tt1375666",
// //     Title: "Inception",
// //     Year: "2010",
// //     Poster:
// //       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
// //     runtime: 148,
// //     imdbRating: 8.8,
// //     userRating: 10,
// //   },
// //   {
// //     imdbID: "tt0088763",
// //     Title: "Back to the Future",
// //     Year: "1985",
// //     Poster:
// //       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
// //     runtime: 116,
// //     imdbRating: 8.5,
// //     userRating: 9,
// //   },
// // ];

// const apiKey = "37a71b3b";
// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// export default function App() {
//   const [movies, setMovies] = useState([]);
//   const [watched, setWatched] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [Error, setError] = useState("");
//   const [query, setQuery] = useState("");
//   const [selectedId, setSelectedId] = useState(null);
//   function onSetSelectedId(id) {
//     setSelectedId((selectedId) => (selectedId === id ? null : id));
//   }
//   // const movieAPIname = "intderstellar";
//   function onClose() {
//     setSelectedId(null);
//   }
//   function onAddWatchedMovie(watchedMovie) {
//     if (watched.every((el) => el.imdbID !== watchedMovie.imdbID)) {
//       setWatched((watched) => [...watched, watchedMovie]);
//     } else {
//       console.log("PLEASE CHOOSE SOMETHING ELSE");
//     }
//   }
//   function onDeleteWatchedMovie(id) {
//     // const [e, id] = arr;
//     // e.stopPropagation();
//     setWatched((movie) => movie.filter((el) => el.imdbID !== id));
//   }
//   //whenever we write a query we get our movies list as query is changed inside this useEffect so it will be called whenver state changes
//   useEffect(
//     function () {
//       const controller = new AbortController();
//       async function fetchMovieAPI() {
//         try {
//           setIsLoading(true);
//           setError("");
//           const res = await fetch(
//             `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${query}`,
//             { signal: controller.signal }
//           );
//           if (!res.ok)
//             throw new Error("⛔ Something went wrong with fetching movies");

//           const data = await res.json();

//           // console.log("data is ", data);

//           if (data.Response === "False") throw new Error("Movies not found ☹️");

//           setMovies(data.Search);
//           setError("");
//         } catch (err) {
//           // console.log(err);
//           // console.error(Error(err.message ?? err));
//           // setMovies("Movies not found");
//         } finally {
//           setIsLoading(false);
//         }
//       }
//       if (query.length < 1) {
//         setMovies([]);
//         setError("");
//         return;
//       }
//       fetchMovieAPI();

//       return function () {
//         controller.abort();
//       };
//     },
//     [query]
//   );
//   return (
//     <>
//       <NavBar>
//         <Logo />
//         <Search query={query} setQuery={setQuery} />
//         <NumResults movies={movies} />
//       </NavBar>
//       <Main>
//         <Box>
//           {isLoading && <Loader />}
//           {!isLoading && !Error && (
//             <MoviesList movies={movies} onSetSelectedId={onSetSelectedId} />
//           )}
//           {Error && <ErrorMessage message={Error} />}
//         </Box>
//         <Box>
//           {selectedId ? (
//             <MovieDetails
//               selectedId={selectedId}
//               onClose={onClose}
//               onAddWatchedMovie={onAddWatchedMovie}
//               watched={watched}
//             />
//           ) : (
//             <>
//               <WatchedSummary watched={watched} />
//               <WatchedMoviesList
//                 watched={watched}
//                 onDeleteWatchedMovie={onDeleteWatchedMovie}
//                 onSetSelectedId={onSetSelectedId}
//               />
//             </>
//           )}
//         </Box>
//       </Main>
//     </>
//   );
// }
// //
// function MovieDetails({ selectedId, onClose, onAddWatchedMovie, watched }) {
//   const [movie, setMovie] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [userRating, setUserRating] = useState(0);
//   const selectedWatchedMovie = watched.find((el) => el.imdbID === selectedId);
//   const watchedUserRating = selectedWatchedMovie?.userRating;
//   const {
//     Title: title,
//     Poster: poster,
//     Runtime: runtime,
//     imdbRating,
//     Plot: plot,
//     Released: released,
//     Actors: actors,
//     Director: director,
//     Genre: genre,
//   } = movie;

//   function handleAdd() {
//     const newMovie = {
//       imdbID: selectedId,
//       title: title,
//       runtime: Number(runtime.split(" ").at(0)),
//       poster: poster,
//       imdbRating: Number(imdbRating),
//       userRating,
//     };

//     onAddWatchedMovie(newMovie);
//     onClose();
//   }

//   useEffect(
//     function () {
//       async function getMovieDetails() {
//         setIsLoading(true);
//         const res = await fetch(
//           `https://www.omdbapi.com/?&apikey=${apiKey}&i=${selectedId}`
//         );
//         const data = await res.json();

//         setMovie(data);
//         setIsLoading(false);
//       }
//       if (selectedId === null) {
//         setMovie({});
//         return;
//       }
//       getMovieDetails();
//     },
//     [selectedId]
//   );

//   //
//   useEffect(
//     function () {
//       if (!title) return;
//       document.title = `Movie | ${title}`;
//       return function () {
//         document.title = "usePopcorn";
//         // console.log(`Clean up effect movie ${title}`);
//       };
//     },
//     [title]
//   );
//   //
//   useEffect(
//     function () {
//       function callBack(e) {
//         if (e.code === "Escape") {
//           onClose();
//           // console.log("CLOSING");
//         }
//       }
//       document.addEventListener("keydown", callBack);
//       return function () {
//         document.removeEventListener("keydown", callBack);
//       };
//     },
//     [onClose]
//   );
//   return (
//     <>
//       <div className="details">
//         {isLoading ? (
//           <Loader />
//         ) : (
//           <>
//             <header>
//               <button type="button" className="btn-back" onClick={onClose}>
//                 &larr;
//               </button>
//               <img src={poster} alt={`name of ${movie}`} />
//               <div className="details-overview">
//                 <h2>{title}</h2>
//                 <p>
//                   {released} &bull; {runtime}
//                 </p>
//                 <p>{genre}</p>
//                 <p>
//                   <span>⭐</span>
//                   <span>{imdbRating}</span>
//                   imdbRating
//                 </p>
//               </div>
//             </header>
//             <section>
//               {/* <h5>Rate</h5> */}

//               <div className="rating">
//                 {watched.every((el) => el.imdbID !== selectedId) ? (
//                   <>
//                     <StarRating
//                       maxRating={10}
//                       size={24}
//                       setRating={setUserRating}
//                     />
//                     {/* if userrating is greater than 0 than display add to list btn also user shoudn't have rated it yet */}
//                     {userRating > 0 && (
//                       <button className="btn-add" onClick={() => handleAdd()}>
//                         + Add to list
//                       </button>
//                     )}
//                   </>
//                 ) : (
//                   <p>You rated this movie {watchedUserRating} 🌟</p>
//                 )}
//               </div>
//               <p>
//                 <em>{plot}</em>
//               </p>
//               <p>Starring : {actors}</p>
//               <p>Directed by : {director}</p>
//             </section>
//             {/* {selectedId} */}
//           </>
//         )}
//       </div>
//     </>
//   );
// }
// //
// function Loader() {
//   return <p className="loader">Loading....</p>;
// }
// function ErrorMessage({ message }) {
//   return <p className="error">'⛔' {message}</p>;
// }

// function NavBar({ children }) {
//   return <nav className="nav-bar">{children}</nav>;
// }
// function Logo() {
//   return (
//     <div className="logo">
//       <span role="img">🍿</span>
//       <h1>usePopcorn</h1>
//     </div>
//   );
// }
// function Search({ query, setQuery }) {
//   return (
//     <input
//       className="search"
//       type="text"
//       placeholder="Search movies..."
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//     />
//   );
// }
// function NumResults({ movies }) {
//   return (
//     <p className="num-results">
//       Found <strong>{movies.length}</strong> results
//     </p>
//   );
// }
// function Main({ children }) {
//   return <main className="main">{children}</main>;
// }

// //MOVIES LIST
// function Box({ children }) {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen && children}
//     </div>
//   );
// }
// function MoviesList({ movies, onSetSelectedId }) {
//   return (
//     <ul className="list">
//       {movies?.map((movie) => (
//         <Movies
//           movie={movie}
//           onSetSelectedId={onSetSelectedId}
//           key={movie.imdbID}
//         />
//       ))}
//     </ul>
//   );
// }
// function Movies({ movie, onSetSelectedId }) {
//   const id = movie.imdbID;
//   return (
//     <li onClick={() => onSetSelectedId(id)}>
//       <img src={movie.Poster} alt={`${movie.Title} poster`} />
//       <h3>{movie.Title}</h3>
//       <div>
//         <p>
//           {/* <span>{movie.imdbID}</span> */}
//           <span>🗓</span>
//           <span>{movie.Year}</span>
//         </p>
//       </div>
//     </li>
//   );
// }
// ///////////////////////

// function WatchedSummary({ watched }) {
//   const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
//   const avgUserRating = average(watched.map((movie) => movie.userRating));
//   const avgRuntime = average(watched.map((movie) => movie.runtime));
//   //
//   // const newAvgImdbRating = Number(avgImdbRating.toFixed(2));
//   // const newAvgUserRating = Number(avgUserRating.toFixed(2));
//   // const newAvgRuntime = Number(avgRuntime.toFixed(2));
//   return (
//     <div className="summary">
//       <h2>Movies you watched</h2>
//       <div>
//         <p>
//           <span>#️⃣</span>
//           <span>{watched.length} movies</span>
//         </p>
//         <p>
//           <span>⭐️</span>
//           <span>{avgImdbRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{avgUserRating.toFixed(2)}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{avgRuntime.toFixed(0)} min</span>
//         </p>
//       </div>
//     </div>
//   );
// }
// function WatchedMoviesList({ watched, onDeleteWatchedMovie, onSetSelectedId }) {
//   return (
//     <ul className="list list-movies">
//       {watched.map((movie) => (
//         <WatchedMovies
//           movie={movie}
//           onDeleteWatchedMovie={onDeleteWatchedMovie}
//           onSetSelectedId={onSetSelectedId}
//           key={movie.imdbID}
//         />
//       ))}
//     </ul>
//   );
// }
// function WatchedMovies({ movie, onDeleteWatchedMovie, onSetSelectedId }) {
//   return (
//     <li key={movie.imdbID}>
//       <img src={movie.poster} alt={`${movie.title} poster`} />
//       <h3>{movie.title}</h3>
//       <div>
//         <p>
//           <span>⭐️</span>
//           <span>{movie.imdbRating}</span>
//         </p>
//         <p>
//           <span>🌟</span>
//           <span>{movie.userRating}</span>
//         </p>
//         <p>
//           <span>⏳</span>
//           <span>{movie.runtime} min</span>
//         </p>
//       </div>
//       <button
//         className="btn-delete"
//         onClick={() => onDeleteWatchedMovie(movie.imdbID)}
//       >
//         X
//       </button>
//     </li>
//   );
// }
