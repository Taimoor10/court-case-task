import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CreateCaseForm } from './Components/CreateCase/CreateCaseForm';
import { Navbar } from './Components/Navbar/Navbar';
import { ListCases } from './Components/CasesTable/ListCases';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CreateCaseForm />} />
          <Route path='/createCase' element={<CreateCaseForm />} />
          <Route path='/cases' element={<ListCases />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
