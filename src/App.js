import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './page/Home'
import BoardList from './page/BoardList'
import Layout from './page/Layout'
import Board from './page/Board'
import BoardWriteForm from './page/BoardWriteForm';
import BoardModifyForm from './page/BoardModifyForm';
import LoginForm from './page/LoginForm';
import ImagePage from './page/ImagePage';

import {DataProvider} from './context/DataContext';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Home />}/>
            <Route path='/boardlist' element={<BoardList />}/>
            <Route path='/boardlist/:id' element={<Board />}/>
            <Route path='/boardwriteform' element={<BoardWriteForm />}/>
            <Route path='/board-modify-form' element={<BoardModifyForm />}/>

            <Route path='/loginform' element={<LoginForm />}/>

            <Route path='/image' element={<ImagePage />}/>
          </Route>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
