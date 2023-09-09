import React, { Component } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { Route, Routes } from 'react-router-dom';
export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar />

        <Routes>
          <Route exact path='/' element={<News pageSize={8} key="general" country="us" category="general"></News>} />
          <Route exact path='/Entertainment' element={<News key="entertainment" pageSize={8} country="us" category="entertainment"></News>} />
          <Route exact path='/Health' element={<News key="health" country="us" pageSize={8} category="health"></News>} />
          <Route exact path='Science' element={<News country="us" key="science" pageSize={8} category="science"></News>} />
          <Route exact path='/Sports' element={<News country="us" key="sports" pageSize={8} category="sports"></News>} />
          <Route exact path='/Technology' element={<News country="us" key="technology" pageSize={8} category="technology"></News>} />

        </Routes>
      </div>

    )
  }
}