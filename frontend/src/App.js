import { Route, Routes } from 'react-router-dom';
import News from './components/news/home/News';
import './index.css';
import NotFound from './components/_util/Notfound';
import Header from './components/_util/Header';
import Footer from './components/_util/Footer';
import EventCalendar from './components/eventCalendar/EventCalendar';
import Home from './components/home/Home';
import SelfIntroduction from './components/selfIntroduction/home/SelfIntroduction';
import Photos from './components/photos/Photos';
import EachNews from './components/news/eachNews/EachNews';
import UploadNews from './components/news/uploads/UploadNews';
import Profile from './components/_util/account/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/_util/account/LoginButton';
import EachSelfIntroduction from './components/selfIntroduction/eachSelfIntroduction/EachSelfIntroduction';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div className="bg-bg-light">
        <Header />
        <div>
          Loading ...
        </div>
        <Footer />
      </div>)
  }
  return (
    <>
      {isAuthenticated ? (
        <div className="App bg-bg-light">
          <Header />
          {isLoading && <div>Loading ...</div>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/uploads" element={<UploadNews />} />
            <Route path="/news/:postId" element={<EachNews />} />
            <Route path="/event" element={<EventCalendar />} />
            <Route path="/selfintroduction" element={<SelfIntroduction />} />
            <Route path="/selfintroduction/:postId" element={<EachSelfIntroduction />} />
            <Route path="/photos" element={<Photos />} />
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
