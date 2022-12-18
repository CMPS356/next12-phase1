
const parent_student = require('../../data/parent-student.json')
const tasks = require('../../data/tasks.json')
const surahs = require('../../data/surah.json')
import { useLoginStore } from '../../stores/loginStore'
import { taskService } from "../../services/tasks-service";
import TaskToggle from './TaskToggle';
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import UpdateTask from './UpdateTask';

// displays a list of task 
export default function TasksViewer() {
    const userContext = useLoginStore(state => state.userContext)
    if (userContext.role != 'parent' && userContext.role != 'coordinator' ) return <></>

    if (userContext.role == 'coordinator')
    {    const [students2, setStudents2] = useState(parent_student.filter((p => p.students.filter(ss => ss.teacherId == userContext.id))).flatMap(p => p.students))
    return ( 
    <Box sx={{ flexGrow: 1, maxWidth: 752, marginTop: "20px" }}>
            {/* {JSON.stringify(students2)} */}
            <Grid item xs={12} md={6}>
                <Box sx={{ flexGrow: 1, width: "1000px", height: "1000px", overflow: "auto" }}>
                    <List sx={{ marginLeft: '20px', height: "90px" }}>
                        {tasks.map((t, i) =>
                            <>
                                <div style={{ justifyContent: "end", width: "815px" }}>
                                </div>
                                <ListItem
                                    sx={{ width: "900px", height: "70px" }}
                                    key={t.taskId}
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <AssignmentIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`${i + 1} - ${t.type}   of   ${surahs.find(surah => surah.id == t.surahId).englishName} - ${students2.find(s => s.studentId == t.studentId)?.lastName}, ${students2.find(s => s.studentId == t.studentId)?.firstName}`} />
                                    <span style={{ marginRight: "20px" }}>{`AYA: ${t.fromAya} - ${t.toAya} `}</span>
                                    <span>{`DUE: ${t.dueDate}`}</span>
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Grid>
        </Box>)}
    else if (userContext.role == 'parent'){   
         const [students, setStudents] = useState(parent_student.find(p => p.id == userContext.id).students)
        return (
            <Box sx={{ flexGrow: 1, maxWidth: 752, marginTop: "20px" }}>
                {/* {JSON.stringify(students)} */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ flexGrow: 1, width: "1000px", height: "500px", overflow: "auto" }}>
                        <List sx={{ marginLeft: '20px', height: "90px" }}>
                            {tasks.filter(t => students.find(tt => tt.studentId == t.studentId)).map((t, i) =>
                                <>
                                    <div style={{ justifyContent: "end", width: "815px" }}>
                                    </div>
                                    <ListItem
                                        sx={{ width: "900px", height: "70px" }}
                                        key={t.taskId}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AssignmentIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${i + 1} - ${t.type}   of   ${surahs.find(surah => surah.id == t.surahId).englishName} - ${students.find(s => s.studentId == t.studentId)?.firstName}`} />
                                        <span style={{ marginRight: "20px" }}>{`AYA: ${t.fromAya} - ${t.toAya} `}</span>
                                        <span>{`DUE: ${t.dueDate}`}</span>
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </Box>
                </Grid>
            </Box>)
    }
}