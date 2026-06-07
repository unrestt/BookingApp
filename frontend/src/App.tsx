import { Route, Routes } from 'react-router-dom'
import './App.css'
import CustomToaster from './components/CustomToaster'
import MainLayout from './layout/MainLayout'
import PageNotFound from './layout/PageNotFound'

function App() {


  return (
    <>
      <CustomToaster/>
      <Routes>
        <Route path='/' element={<MainLayout/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App
