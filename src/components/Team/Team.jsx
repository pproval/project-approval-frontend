import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import { database } from '../../firebase/firebase'
import Navbar from '../Navbar/Navbar'
import TeamMember from '../TeamMember/TeamMember'

// Styles
import './Team.css'

export default function Team() {

    const [userData, setUserData] = useState(null);
    const { currentUser } = useContext(AuthContext);
    let team = userData === null ? [] : userData?.team;

    useEffect(() => {
        const unsubscribe = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        });
        return unsubscribe;
    }, [currentUser]);


    return (
        <>
            <Navbar />
            <div className="Team">
                <div className="Team-container">
                    <div className="Team-header">
                        <h1 style={{ fontSize: "40px" }}>{userData === null ? "Team Name/Project Name" : userData?.teamName + "/" + userData?.projectTitle}</h1>
                    </div>
                    <div className="Team-body">
                        {
                            team.length === 0 ?
                                <>
                                    <TeamMember />
                                    <TeamMember />
                                    <TeamMember />
                                    <TeamMember />
                                </>
                                :
                                <>
                                    {
                                        team.map((member) => {
                                            return <TeamMember
                                                key={member.uid}
                                                name={member.name}
                                                college={member.college}
                                                course={member.course}
                                                branch={member.branch}
                                                eno={member.eno}
                                            />
                                        })
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
