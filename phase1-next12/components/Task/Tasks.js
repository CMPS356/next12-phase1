
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
export default function Tasks() {
    const userContext = useLoginStore(state => state.userContext)
    if (userContext.role != 'teacher') return <></>

    const [students, setStudents] = useState(parent_student.filter(p => p.students.filter(ss => ss.teacherId == userContext.id)).flatMap(p => p.students).filter(ss => ss.teacherId == userContext.id))
    const [studentsList, setStudentsList] = useState(parent_student.filter(p => p.students.filter(ss => ss.teacherId == userContext.id)).flatMap(p => p.students).filter(ss => ss.teacherId == userContext.id))
    const [task, setTask] = useState({})
    const [tasks, setTasks] = useState(_tasks)
    const [selectedName, setSelectedName] = useState(studentsList[0].studentId)
    const [selectedStatus, setSelectedStatus] = useState('all')

    //Dialog
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [selectedValue, setSelectedValue] = useState("value")
    const [selectedValue2, setSelectedValue2] = useState("value")

    useEffect(()=>{
        setStudents(studentsList.filter(s => s.studentId == selectedName))
    },[selectedName])

    useEffect(()=>{
        if(selectedStatus == 'completed')
        setTasks(_tasks.filter(t => t.completedDate))
        else if(selectedStatus == 'pending')
        setTasks(_tasks.filter(t => !t.completedDate))
        else
        setTasks(_tasks)

    },[selectedStatus])

    const setCompleteDate = (task, value) => {
        console.log(task, value)
        if (value) {
            taskService.update(task.taskId, { ...task, completedDate: `${new Date().toDateString()}` })
        }
        else {
            const updatedTask = task
            delete updatedTask.completedDate;
            taskService.update(task.taskId, updatedTask)
        }
    }

    const handleClickOpen = (s) => {
        setTask(s)
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value)
    };

    const handleDelete = (id) => {
        taskService.remove(id)
    };

    const handleClickOpen2 = (s) => {
        setTask(s)
        setOpen2(true);
    };

    const handleClose2 = (value) => {
        setOpen2(false);
        setSelectedValue2(value)
    };

    if (userContext.role != 'teacher') return <></>
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752, marginTop: "20px" }}>
            {/* {JSON.stringify(selectedName)} */}
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
                    sx={{ marginTop: "10px", width: "278px" }}
                    inputProps={{ "aria-label": "Halaqa" }}
                >
                    {studentsList.map(s => <MenuItem key={s.studentId} value={s.studentId}>{`${s.lastName}, ${s.firstName}`}</MenuItem>)}
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
                    sx={{ marginTop: "10px", width: "278px" }}
                    inputProps={{ "aria-label": "Halaqa" }}
                >
                    {['completed','pending','all'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </Select>
            </Stack>

            <Grid item xs={12} md={6}>
                <Box sx={{ flexGrow: 1, width: "1000px", height: "500px", overflow: "auto" }}>
                    <List sx={{ marginLeft: '20px', height: "90px", marginTop: "50px" }}>
                        {tasks.filter(t => students.find(tt => tt.studentId == t.studentId)).map((t, i) =>
                            <>
                                <ListItem
                                    sx={{ width: "900px", height: "70px" }}
                                    key={t.taskId}
                                    secondaryAction={
                                        <>
                                            <span>{t.completedDate ? "COMPLETED" : "PENDING"}</span>
                                            <IconButton
                                                edge="end"
                                                sx={{ marginLeft: "50px" }}
                                                aria-label="delete"
                                                onClick={() => handleDelete(t.taskId)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                sx={{ marginLeft: "50px" }}
                                                onClick={() => handleClickOpen(t)}
                                            >
                                                <BorderColorIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                sx={{ marginLeft: "50px" }}
                                                onClick={() => handleClickOpen2(t)}
                                            >
                                                < CommentIcon sx={{ color: "gray" }} />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <ListItemAvatar>

                                        <TaskToggle setCompleteDate={(v) => setCompleteDate(t, v)} val={t.completedDate ?? false} />

                                    </ListItemAvatar>
                                    <ListItemText primary={`${i + 1} - ${t.type}   of   ${surahs.find(surah => surah.id == t.surahId).englishName} - ${students.find(s => s.studentId == t.studentId)?.firstName}`} />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
                <UpdateTask
                    open={open}
                    task={task}
                    selectedValue={selectedValue}
                    onClose={handleClose}
                />
                <Comments
                    open={open2}
                    task={task}
                    selectedValue2={selectedValue2}
                    onClose={handleClose2}
                />
            </Grid>
        </Box>)
}