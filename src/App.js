import "./App.css";
import Gallery from "./components/Gallery";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="container">
      <h1> Application Axios</h1>

      <div className="card">
        <Gallery />
      </div>

      <div className="card">
        <Weather />
      </div>
    </div>
  );
}

export default App;