import { Route, Routes } from 'react-router-dom';
import News from './components/news/News';
import './index.css';
import NotFound from './components/_util/Notfound';
import Header from './components/_util/Header';
import Footer from './components/_util/Footer';
import EventCalendar from './components/eventCalendar/EventCalendar';
import Home from './components/home/Home';
import SelfIntroduction from './components/selfIntroduction/home/SelfIntroduction';
import Photo from './components/photo/Photo';
import EachNews from './components/news/EachNews';
import UploadNews from './components/news/components/UploadNews';
import Profile from './components/profile/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/_util/account/LoginButton';
import EachSelfIntroduction from './components/selfIntroduction/eachSelfIntroduction/EachSelfIntroduction';
import Loading from './components/_util/Loading';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div className="bg-bg-light">
        <Header />
        <Loading />
        <Footer />
      </div>)
  }
  return (
    <>
      {isAuthenticated ? (
        <div className="App bg-bg-light">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/uploads" element={<UploadNews />} />
            <Route path="/news/:postId" element={<EachNews />} />
            <Route path="/event" element={<EventCalendar />} />
            <Route path="/selfintroduction" element={<SelfIntroduction />} />
            <Route path="/selfintroduction/:postId" element={<EachSelfIntroduction />} />
            <Route path="/photo" element={<Photo />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      ) : (
        <div className="bg-bg-light">
          <Header />
          <LoginButton />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
