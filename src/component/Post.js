import React, { useEffect, useState } from 'react'
import "../css/Post.css"
import { Avatar } from '@material-ui/core';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import RepeatOutlinedIcon from '@material-ui/icons/RepeatOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { selectQuestionName, setQuestionInfo } from "../features/questionSlice";
import { selectQuestionId } from './../features/questionSlice';
import db from '../firebase';
import { selectUser } from './../features/userSlice';
import firebase from 'firebase';

Modal.setAppElement("#root");


function Post( {Id, question, image, timestamp, questUser} ) {
    
    
    const user = useSelector(selectUser)
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();
    
    const questionId = useSelector(selectQuestionId);
    const questionName = useSelector(selectQuestionName);
    const [answer, setAnswer] = useState("");

    const [getAnswer, setGetAnswer] = useState([]);

    useEffect(() => {
        if(questionId) {
            db.collection('questions').doc(questionId).
            collection('answer').orderBy('timestamp', 'desc').
            onSnapshot(snapshot => setGetAnswer(snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    answers: doc.data()
                }))));
        }
    },[questionId]);

    const handleAnswer = (e) => {
        e.preventDefault();

        if(questionId){
            db.collection('questions').doc(questionId).
            collection('answer').add({
                questionId: questionId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                answer: answer,
                user: user,
            })

            console.log(questionId, questionName);
            setAnswer("");
            setOpenModal(false);
        }
    }
    
    return (
        <div className="post"
            onClick = {() => dispatch(setQuestionInfo({
                questionId: Id,
                questionName: question
            }))}
        >
            <div className="post__info">
                <Avatar src = {questUser.photo} />
                <h5>{questUser.displayName ? questUser.displayName : questUser.email }</h5>
                <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>
            
            <div className="post__body">
                <div className="post__question">
                    <p>{question}</p>
                    <button onClick={() => setOpenModal(true)} className="post__btnAnswer">Answer</button>
                    <Modal
                        isOpen={openModal}
                        onRequestClose={() => setOpenModal(false)}
                        shouldCloseOnOverlayClick={false}
                        style={{
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
                        <div className="modal__question">
                            <h1>{question}</h1>
                            <p>
                                asked by 
                                <span className="name">  {questUser.displayName ? questUser.displayName: questUser.email}</span> {""} on
                                <span className="name">  {new Date(timestamp?.toDate()).toLocaleString()}</span>
                            </p>
                        </div>

                        <div className="modal__answer">
                            <textarea
                                required
                                value = {answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Enter Your Answer"
                                type="text"
                            />
                        </div>

                        <div className="modal__button">
                            <button className="cancle" onClick={() => setOpenModal(false)}>Cancel</button>
                            <button onClick={handleAnswer} type="sumbit" className="add">Add Answer</button>
                        </div>
                    </Modal>
                    
                </div>

                <div className="post__answer">
                    {
                        getAnswer.map(({id, answers}) => (
                        // {
                        //  Id === answers.questionId ? (  
                           <p
                            key={id}
                            style = {{
                                position: 'relative',
                                color: "blue",
                                backgroundColor: "#c2c2d6"

                            }}
                            >
                             {
                               Id === answers.questionId ? (
                                    <p
                                        style = {{
                                            paddingBottom: "15px",
                                            marginBottom: "10px",
                                            marginLeft: "6px",
                                            borderBottom: "1px solid gray",
                                            
                                            
                                        }}
                                    >
                                        {answers.answer}
                                        <br />
                                        {/* all */}
                                        <span
                                            style = {{

                                                position: "absolute",
                                                fontSize: "small",
                                                display: "flex",
                                                right: "5px",
                                                
                                                
                                            }}
                                        >
                                            {/* timestamp */}
                                            <span
                                                style = {{
                                                    color: "#f86363",
                                                    marginTop: "-5px",
                                                    
                                                }}                                    
                                            >
                                                {
                                                    answers.user.displayName ? answers.user.displayName : answers.user.email
                                                }{" "} on {" "}{new Date(answers.timestamp?.toDate()).toLocaleString()}
                                            </span>
                                        </span>
                                    </p>

                            ) : ("")}
                           </p> 
                        ))
                    }
                    
                </div>
                <img src={image} alt="" />
            </div>

            <div className="post__footer">
                <div className="post__footerAction">
                    <div className="post__upward">
                        <ArrowUpwardOutlinedIcon />
                    </div>
                    
                    <div className="post__downward">
                        <ArrowDownwardOutlinedIcon />
                    </div>
                    
                </div>

                <RepeatOutlinedIcon />
                <ChatBubbleOutlineOutlinedIcon />

                <div className="post__footerLeft">
                    <ShareOutlinedIcon />
                    <MoreHorizOutlinedIcon />
                </div>
            </div>
        </div>
    )
}

export default Post
