import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import App from "./Appv2";

// import { ErrorInfo } from "react";
// import ErrorBoundary from "./ErrorBoundary";
// const messages1 = ["Terrible", "Okay", "Average", "Good", "Amazing"];
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// function Another() {
/* <StarRating maxRating={5} />
  <StarRating
  maxRating={5}
  color="red"
  size={35}
  messages={messages1}
  defaultRating={3}
  /> */
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="purple" setRating={setMovieRating} />
//       <p>This text has {movieRating}</p>
//     </div>
//   );
// }
