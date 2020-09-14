import React, { Suspense } from "react";
import Routes from "./routes/routes";

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
);

const App = () => (
  <Suspense fallback={<Loader />}>
    <Routes />
  </Suspense>
);

export default App;
