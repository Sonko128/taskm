import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/home/home';
import Add from './components/student/Add';
import Add_teacher from './components/teacher/Add_teacher';
import Add_assign from './components/assignment/Add_assign';
import Add_notes from './components/notes/Add_notes';

function App() {
  return (
 
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/student' element={<Add />} />
        <Route path='/teacher' element={<Add_teacher/>} />
        <Route path='/assign' element={<Add_assign/>} />
        <Route path='/notes' element={<Add_notes/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
