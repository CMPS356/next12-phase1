const parent_student = require('../../data/parent-student.json')
const _tasks = require('../../data/tasks.json')
const surahs = require('../../data/surah.json')
import { useLoginStore } from '../../stores/loginStore'
import { taskService } from "../../services/tasks-service";
import TaskToggle from './TaskToggle';
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Stack } from '@mui/system';
import { MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import List from "@mui/material/List";
import CommentIcon from '@mui/icons-material/Comment';
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
import Comments from './Comments';


// displays a list of task 
export default function TasksViewer() {
    const userContext = useLoginStore(state => state.userContext)
    if (userContext.role != 'parent' && userContext.role != 'coordinator') return <></>

    if (userContext.role == 'coordinator') {
        const [students, setStudents] = useState(parent_student.filter(p => p.students.filter(ss => ss.teacherId == userContext.id)).flatMap(p => p.students))
        const [studentsList, setStudentsList] = useState(parent_student.filter(p => p.students.filter(ss => ss.teacherId == userContext.id)).flatMap(p => p.students))
        
        const [tasks, setTasks] = useState(_tasks)
        const [selectedName, setSelectedName] = useState(1)
        const [selectedStatus, setSelectedStatus] = useState('all')
    
        useEffect(()=>{
            if(selectedName=='-'){
                setStudents(studentsList)
            }else{
                setStudents(studentsList.filter(s => s.studentId == selectedName))
            }
        },[selectedName])
    
        useEffect(()=>{
            if(selectedStatus == 'completed')
            setTasks(_tasks.filter(t => t.completedDate))
            else if(selectedStatus == 'pending')
            setTasks(_tasks.filter(t => !t.completedDate))
            else
            setTasks(_tasks)
        },[selectedStatus])

        return (
            <Box sx={{ flexGrow: 1,  marginTop: "20px" }}>
                <Stack flexDirection="row" sx={{ marginBottom: "20px" }}>
                    <Typography
                        sx={{
                            marginY: "20px",
                            marginRight: "32px",
                            color: "#3A3B3C",
                        }}
                    >
                        Student
                    </Typography>
                    <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedName}
                        onChange={e => setSelectedName(e.target.value)}
                        name="selectedName"
                        sx={{ marginTop: "10px", width: "250px" }}
                        inputProps={{ "aria-label": "Halaqa" }}
                    >
                        {[...studentsList,'-'].map(s => <MenuItem key={s.studentId  || '-'} value={s.studentId || '-'}>{`${s.lastName || ""}${s.lastName ?  "," : " "} ${s.firstName || '-'}`}</MenuItem>)}
                    </Select>

                    <Typography
                        sx={{
                            marginTop: "20px",
                            marginX: "32px",
                            color: "#3A3B3C",
                        }}
                    >
                        Status
                    </Typography>
                    <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedStatus}
                        onChange={e => setSelectedStatus(e.target.value)}
                        name="selectedStatus"
                        sx={{ marginTop: "10px", width: "200px" }}
                        inputProps={{ "aria-label": "Halaqa" }}
                    >
                        {['completed', 'pending', 'all'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                    <Button onClick={()=>{setSelectedName('-'); setSelectedStatus('all')}} sx={{width: "200px", marginLeft:"300px"}}>Show All Tasks</Button>

                </Stack>
                {/* {JSON.stringify(students)} */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ flexGrow: 1, width: "1000px", height: "900px", overflow: "auto" }}>
                        <List sx={{ marginLeft: '20px', height: "90px" }}>
                            {tasks.filter(t => students.find(tt => tt.studentId == t.studentId)).map((t, i) =>
                                <>
                                    <div style={{ justifyContent: "end", width: "815px" }}>
                                    </div>
                                    <ListItem
                                        sx={{ width: "900px", height: "70px", marginBottom: "12px" }}
                                        key={t.taskId}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <AssignmentIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={`${i + 1} - ${t.type}   of   ${surahs.find(surah => surah.id == t.surahId).englishName} - ${students.find(s => s.studentId == t.studentId)?.firstName}`}  secondary={`Aya: ${t.fromAya} - ${t.toAya} \u00A0\u00A0\u00A0 Due: ${t.dueDate} \u00A0\u00A0\u00A0 ${t.completedDate ? "COMPLETED - " : "PENDING"} ${t.completedDate ?? ""}`}/>
                                        <span style={{ marginRight: "20px", fontSize: "12px"}}>{`AYA: ${t.fromAya} - ${t.toAya} `}</span>
                                        <span style={{ marginRight: "20px", fontSize: "12px"}}>{`DUE: ${t.dueDate}`}</span>
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </Box>
                </Grid>
            </Box>)
    }
    else if (userContext.role == 'parent') {

        const [students, setStudents] = useState(parent_student.find(p => p.id == userContext.id).students)
        const [studentsList, setStudentsList] = useState(parent_student.find(p => p.id == userContext.id).students)
        const [tasks, setTasks] = useState(_tasks)
        const [selectedName, setSelectedName] = useState(studentsList[0].studentId)
        const [selectedStatus, setSelectedStatus] = useState('all')
    
        useEffect(()=>{
            if(selectedName=='-'){
                setStudents(studentsList)
                setSelectedStatus('all')
            }else{
                setStudents(studentsList.filter(s => s.studentId == selectedName))
            }
        },[selectedName])
    
        useEffect(()=>{
            if(selectedStatus == 'completed')
            setTasks(_tasks.filter(t => t.completedDate))
            else if(selectedStatus == 'pending')
            setTasks(_tasks.filter(t => !t.completedDate))
            else
            setTasks(_tasks)
        },[selectedStatus])

        return (
            <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
                <Stack flexDirection="row" sx={{ marginBottom: "20px" }}>
                    <Typography
                        sx={{
                            marginY: "20px",
                            marginRight: "32px",
                            color: "#3A3B3C",
                        }}
                    >
                        Student
                    </Typography>
                    
                    <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedName}
                        onChange={e => setSelectedName(e.target.value)}
                        name="selectedName"
                        sx={{ marginTop: "10px", width: "250px" }}
                        inputProps={{ "aria-label": "Halaqa" }}
                    >
                           {[...studentsList,'-'].map(s => <MenuItem key={s.studentId  || '-'} value={s.studentId || '-'}>{`${s.lastName || ""}${s.lastName ?  "," : " "} ${s.firstName || '-'}`}</MenuItem>)}
                    </Select>

                    <Typography
                        sx={{
                            marginTop: "20px",
                            marginX: "32px",
                            color: "#3A3B3C",
                        }}
                    >
                        Status
                    </Typography>
                    <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedStatus}
                        onChange={e => setSelectedStatus(e.target.value)}
                        name="selectedStatus"
                        sx={{ marginTop: "10px", width: "200px" }}
                        inputProps={{ "aria-label": "Halaqa" }}
                    >
                        {['completed', 'pending', 'all'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                    <Button onClick={()=>{setSelectedName('-')}} sx={{width: "200px", marginLeft:"300px"}}>Show All Tasks</Button>

                </Stack>
                {/* {JSON.stringify(students)} */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ flexGrow: 1, width: "1000px", height: "500px", overflow: "auto" }}>
                        <List sx={{ marginLeft: '20px', height: "90px" }}>
                            {tasks.filter(t => students.find(tt => tt.studentId == t.studentId)).map((t, i) =>
                                <>
                                    <div style={{ justifyContent: "end", width: "815px", marginBottom: "12px" }}>
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
                                        <ListItemText primary={`${i + 1} - ${t.type}   of   ${surahs.find(surah => surah.id == t.surahId).englishName} - ${students.find(s => s.studentId == t.studentId)?.firstName}`} 
                                        secondary={`Feedback: ${t.comment || "-"} \u00A0\u00A0\u00A0 Mastery Level: ${t.masteryLevel  || "-"} \u00A0\u00A0\u00A0 ${t.completedDate ? "COMPLETED - " : "PENDING"} ${t.completedDate ?? ""}`}/>
                                        <span style={{ marginRight: "20px", fontSize: "12px"}}>{`AYA: ${t.fromAya} - ${t.toAya} `}</span>
                                        <span style={{ marginRight: "20px", fontSize: "12px"}}>{`DUE: ${t.dueDate}`}</span>
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </Box>
                </Grid>
            </Box>)
    }
}