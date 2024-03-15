import { Route, Routes } from 'react-router-dom';
import News from './components/news/News';
import './index.css';
import NotFound from './components/_util/Notfound';
import Header from './components/_util/Header';
import Footer from './components/_util/Footer';
import EventCalendar from './components/eventCalendar/EventCalendar';
import Home from './components/home/Home';
import SelfIntroduction from './components/selfIntroduction/SelfIntroduction';
import Photo from './components/photo/Photo';
import EachNews from './components/news/EachNews';
import UploadNews from './components/news/components/UploadNews';
import Profile from './components/profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/_util/account/LoginButton';
import EachSelfIntroduction from './components/selfIntroduction/components/EachSelfIntroduction';
import Loading from './components/_util/Loading';
import UploadEvent from './components/eventCalendar/components/UploadEvent';
import FromDev from './components/fromDev/FromDev';
import UserPolicy from './components/fromDev/componets/UserPolicy';
import PrivacyPolicy from './components/fromDev/componets/PrivacyPolicy';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  return (
    <div className="bg-bg-light">
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/uploads" element={<UploadNews />} />
            <Route path="/news/:postId" element={<EachNews />} />
            <Route path="/event" element={<EventCalendar />} />
            <Route path="/event/upload" element={<UploadEvent />} />
            <Route path="/selfintroduction" element={<SelfIntroduction />} />
            <Route path="/selfintroduction/:postId" element={<EachSelfIntroduction />} />
            <Route path="/photo" element={<Photo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/fromdev" element={<FromDev />} />
            <Route path="/fromdev/userpolicy" element={<UserPolicy />} />
            <Route path="/fromdev/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LoginButton />} />
            <Route path="/fromdev/userpolicy" element={<UserPolicy />} />
          </Routes>
        ))}
      <Footer />
    </div>
  );
}

export default App;
