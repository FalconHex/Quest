import React from 'react'
import "../css/QuestBox.css"
import { Avatar } from '@material-ui/core';
import { selectUser } from './../features/userSlice';
import { useSelector } from 'react-redux';

function QuestBox() {

    const user = useSelector(selectUser);
    return (
        <div className="questBox">
            <div className="questBox__info">
                <Avatar 
                    src= {user.photo}
                />
                <h5>{user.displayName}</h5>
            </div>

            <div className="questBox__quest">
                <p>What is in your mind?</p>
            </div>
        </div>
    )
}

export default QuestBox
