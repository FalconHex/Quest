import { Add } from '@material-ui/icons';
import React from 'react';
import "../css/SidebarOptions.css"

function SidebarOptions() {
    return (
        <div className="sidebarOptions">
            
            <div className="sidebarOption">
                <img src="https://i.imgur.com/zf17NUf.jpg" alt="" />
                <p>Hackathons</p>
            </div>

            <div className="sidebarOption">
                <img src="https://i.imgur.com/skeM0Qb.jpg" alt="" />
                <p>Fests</p>
            </div>

            <div className="sidebarOption">
                <img src="https://i.imgur.com/jtBK4X8.jpg" alt="" />
                <p>Clubs</p>
            </div>

            <div className="sidebarOption">
                <img src="https://i.imgur.com/rSLT0Sy.jpg" alt="" />
                <p>Classes</p>
            </div>

            <div className="sidebarOption">
                <img src="https://i.imgur.com/qRqWIBt.jpg" alt="" />
                <p>Placement</p>
            </div>

            <div className="sidebarOption">
                <img src="https://i.imgur.com/z5QP6uD.jpg" alt="" />
                <p>Internships</p>
            </div>

            <div className="sidebarOption">
                <img src="https://i.imgur.com/3aPOTy0.jpg" alt="" />
                <p>Research</p>
            </div>

            <div className="sidebarOption">
                <img src="https://i.imgur.com/2I1bsaE.jpg" alt="" />
                <p>Exams</p>
            </div>

            <div className="sidebarOption">
                <img src="https://i.imgur.com/Fveu3de.jpg" alt="" />
                <p>Social</p>
            </div>

            <div className="sidebarOption">
                <img src="https://i.imgur.com/cLPYBzn.jpg" alt="" />
                <p>Memes</p>
            </div>

            <div className="sidebarOption">
                <Add />
                <p className="text">Discover Spaces</p>
            </div>
    
        </div>
    )
}

export default SidebarOptions
