import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DictListPage from './pages/DictListPage';
import DictViewPage from './pages/DictViewPage';
import WordBookPage from './pages/WordBookPage';
import FolderListViewPage from './pages/FolderListViewPage';
import StudyLogListPage from './pages/StudyLogListPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/dict/search" element={<DictListPage />}></Route>
          <Route path="dict/searchView" element={<DictViewPage />}></Route>
          <Route path="/wordbook" element={<WordBookPage />}></Route>
          <Route path="/wordbook/folder" element={<FolderListViewPage />} />
          <Route path="/studyLog" element={<StudyLogListPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
