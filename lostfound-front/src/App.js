//import logo from './logo.svg';
import './App.css';
import { BrowserRouter ,Routes,Route } from 'react-router-dom';
import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import StudentMenu from './Components/LoginComponent/StudentMenu';
import StudentList from './Components/LoginComponent/StudentList';
import ChatPage from './Components/LoginComponent/ChatPage';
import ReportingDashboard from './Components/LoginComponent/ReportingDashboard';
import UserProfile from './Components/LoginComponent/UserProfile';

import LostItemRegistration from './Components/ItemComponent/LostItemRegistration';
import LostItemReport from './Components/ItemComponent/LostItemReport';
import FoundItemRegistration from './Components/ItemComponent/FoundItemRegistration';
import FoundItemReport from './Components/ItemComponent/FoundItemReport';
import MatchItemSearch from './Components/ItemComponent/MatchItemSearch';
import MatchItemReport from './Components/ItemComponent/MatchItemReport';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterUser/>}/> 
          <Route path='/admin-menu' element={<AdminMenu/>}/>
          <Route path='/student-menu' element={<StudentMenu/>}/> 
          <Route path='/student-list' element={<StudentList/>}/>
          <Route path='/reporting' element={<ReportingDashboard/>}/>
          <Route path='/profile' element={<UserProfile/>}/>
          <Route path='/chat' element={<ChatPage/>}/>
          <Route path='/lost-entry' element={<LostItemRegistration/>}/>
          <Route path='/lost-list' element={<LostItemReport/>}/>
          <Route path='/found-entry' element={<FoundItemRegistration/>}/>
          <Route path='/found-list' element={<FoundItemReport/>}/>
          <Route path='/match-search/:lostItemId' element={<MatchItemSearch/>}/>
          <Route path='/match-list' element={<MatchItemReport/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
