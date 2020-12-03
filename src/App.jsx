import React, { createContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppsPage from "./components/AppsPage";
import FailedPage from "./components/FailedPage";


import Peer from 'skyway-js'
import "./App.css";

//Peer作成
const peer = new Peer({
  key: '13059aa8-d1a4-463e-b24a-67b07d6fff08',
  debug: 3
});

export const PeerContext = createContext();

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>skyway-js sample</h1>
      </header>
      <main className="main">
        <PeerContext.Provider value={peer}>
          <Router>
            <Route exact path="/" component={AppsPage}></Route>
            <Route path="/failed" component={FailedPage}></Route>
          </Router>
        </PeerContext.Provider>
    </main>
    </div>
  );
}
