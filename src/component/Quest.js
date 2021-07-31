import React from 'react'
import "../css/Quest.css"
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widget from './Widget';


function Quest() {
    return (
        <div className="quest">
            <Navbar />
            <div className="quest__content">
                <Sidebar />
                <Feed />
                <Widget />
            </div>
        </div>
    )
}

export default Quest
