import React, { useEffect, useState } from 'react'
import { database } from '../../firebase/firebase'
import Navbar from '../Navbar/Navbar'
import TeamMember from '../TeamMember/TeamMember'

// Styles
import './ViewTeam.css'

export default function ViewTeam(props) {

    const projectId = props.match.params.projectId;
    const [projectData, setProjectData] = useState(null);
    
    let team = projectData === null ? [] : projectData?.team;

    useEffect(() => {
        console.log(projectId);
        const unsubscribe = database.projects.doc(projectId).onSnapshot((doc) => {
            setProjectData(doc.data());
        });
        return unsubscribe;
    }, [projectId]);


    return (
        <>
            <Navbar />
            <div className="Team">
                <div className="Team-container">
                    <div className="Team-header">
                        <h1 style={{ fontSize: "40px" }}>{projectData === null ? "Team Name/Project Name" : projectData?.teamName + "/" + projectData?.title}</h1>
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
