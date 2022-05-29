import Dashboard from './Components/Dashboard/Dashboard';
import { ArcelorMittalProvider } from "./Context/ArcelorMittalContext";

function App() {
  return (
    <ArcelorMittalProvider>
      <Dashboard />
    </ArcelorMittalProvider>
  );
}

export default App;
