import React from 'react'
import HomeIcon from '@material-ui/icons/Home';
import FeaturedPlayListOutlinedIcon from '@material-ui/icons/FeaturedPlayListOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import SearchIcon from '@material-ui/icons/Search';
import LanguageIcon from '@material-ui/icons/Language';
import { Avatar, Button, Input} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

import "../css/Navbar.css";
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import { selectUser } from './../features/userSlice';
import Modal from "react-modal";
import { useState } from 'react';
import { ExpandMore } from '@material-ui/icons';
import db from './../firebase';
import firebase from 'firebase';

function Navbar() {

    const user = useSelector(selectUser);
    const [openModal, setOpenModal] = useState(false);
    const [input, setInput] = useState("");
    const [inputUrl, setInputUrl] = useState("");

    const handleQuestion = (e) => {
        e.preventDefault();

        setOpenModal(false);
        
        db.collection("questions").add({
            question: input,
            imageUrl: inputUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user,
        })

        setInput("");
        setInputUrl("");
    }

    return (
        <div className="qHeader">
            <div className="qHeader__logo">
                <img src="https://i.imgur.com/nK0xZix.png" alt="" />
            </div>

            <div className="qHeader__icons">
                <div className="qHeader__icon">
                    <HomeIcon />
                </div>
                <div className="qHeader__icon">
                    <FeaturedPlayListOutlinedIcon /> 
                </div>
                <div className="qHeader__icon">
                    <AssignmentTurnedInOutlinedIcon />
                </div>
                <div className="qHeader__icon">
                    <PeopleAltOutlinedIcon />
                </div>
                <div className="qHeader__icon">
                    <NotificationsOutlinedIcon />
                </div>
            </div>

            <div className="qHeader__input">
                <SearchIcon />
                <input type="text" placeholder="Search Quest"/>
            </div>

            <div className="qHeader__Rem">
                <div className="qHeader__avatar">
                    <Avatar 
                        onClick = {() => auth.signOut()}
                        src={user.photo}
                    />
                </div>
                <LanguageIcon />
                
                <Button onClick = {() => setOpenModal(true)}>Add Question</Button>
                <Modal 
                    
                    isOpen = {openModal}
                    onRequestClose = {() => setOpenModal(false)}
                    shouldCloseOnOverlayClick = {false} 
                    style = {{
                        overlay: {
                            width: 780,
                            height: 550,
                            backgroundColor: "rgba(160, 211, 235, 0.7)",
                            zIndex: "1000",
                            top: "55%",
                            left: "45%",
                            marginTop: "-250px",
                            marginLeft: "-350px",
                        },
                        
                    }}
                >
                    <div className="modal__title">
                        <h5>Add Question</h5>
                        <h5>Share Link</h5>
                    </div>
                    <div className="modal__info">
                        <Avatar 
                            className="avatar"
                            src = {user.photo}
                        />
                        <p>{user.displayName ? user.displayName : user.email} asked</p>
                        <div className="modal__scope">
                            <PeopleAltOutlinedIcon />
                            <p>Public</p>
                            <ExpandMore />
                        </div>
                    </div>
                    <div className="modal__Field">
                        <textarea 
                            required
                            value = {input}
                            onChange={(e) => setInput(e.target.value)}
                            type="text"
                            placeholder="Start your question "
                        />
                        <div className="modal__fieldLink">
                            <LinkIcon />
                            <input 
                                value = {inputUrl}
                                onChange={(e) => setInputUrl(e.target.value)}
                                type="text"
                                placeholder="Optional: include link that gives context."
                            ></input>
                        </div>
                    </div>
                    <div className="modal__buttons">
                        <button className="cancle" onClick={() => setOpenModal(false)}>Close</button>
                        <button onClick={handleQuestion}type="submit" className="add">Add Question</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}

export default Navbar
