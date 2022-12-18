
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

// displays a list of task 
export default function Tasks() {
    const userContext = useLoginStore(state => state.userContext)
    const [students, setStudents] = useState(parent_student.filter(p => p.students.filter(ss => ss.teacherId == userContext.id)).flatMap(p => p.students).filter(ss => ss.teacherId == userContext.id))
    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState("value")
    const [task, setTask] = useState({})

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

    const handleDelete = (student) => {
        taskService.remove(task.studentId)
    };
    if (userContext.role != 'teacher') return <></>
    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752, marginTop: "20px" }}>
            <Grid item xs={12} md={6}>
                <Box sx={{ flexGrow: 1, width: "1000px", height: "500px", overflow: "auto" }}>
                    <List sx={{ marginLeft: '20px', height: "90px" }}>
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
                                                onClick={() => handleDelete(t)}
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
                                                onClick={() => handleDelete(t)}
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
            </Grid>
        </Box>)
}