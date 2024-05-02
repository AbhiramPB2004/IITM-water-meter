import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import Circle from './crop/Circle'
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import LoginSignUp from './loginfolder/loginSignup'
import Livepage from './livePage/Livepage'
import Form from './crop/Form'
import Chatbot from './chatsystem/chat'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

function renderapp(){
  return(<div className='grid-container'>
  <Header OpenSidebar={OpenSidebar}/>
  <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
  <Home />
</div>);
}

  return (
    
    <BrowserRouter>
    <Routes>
      
    {/* <Route path='/'e  exact index element={<LoginSignUp/>}
    ></Route> */}
    <Route path='/'e  exact index element={renderapp()}></Route>
    <Route path='/live' element={<Livepage/>}></Route>
    <Route path='/form' element={<Form/>}></Route>
    <Route path='/chat' element={<Chatbot/>}></Route>


    </Routes> 

    </BrowserRouter>


  )
}

export default App
