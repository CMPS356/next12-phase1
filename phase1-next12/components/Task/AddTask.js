import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    MenuItem,
    Radio,
    Select
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { Stack } from "@mui/system";
const parent_student = require('../../data/parent-student.json')
const _surahs = require('../../data/surah.json')
import Alert from '@mui/material/Alert';
import { useLoginStore } from "../../stores/loginStore";
import { taskService } from "../../services/tasks-service";

//Automatically generate id, 
// Task name 
// select Student,
// Sura, 
// Aya range,
// due date (defaukt Today + 1), 
// Type of task

//optional

// "completedDate": "2/04/2016",
// "masteryLevel": "Excellent",
// "comment": "Excellent work"

const tomorrowsDate = () => {
    const today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    return tomorrow
}


const styleBlock = {
    margin: {
        marginBottom: "18px",
        fontFamily: "unset",
    },
};

const initialTaskState =
{
    studentId: -1,
    surahId: -1,
    fromAya: 1,
    toAya: 1,
    type: "Memorization",
    dueDate: ""
}

export default function AddTask() {
    const userContext = useLoginStore(state => state.userContext)
    if (userContext.role != 'teacher') return <></>
    const [task, setTask] = useState(initialTaskState);
    const [success, setSuccess] = useState(false);
    const [students, setStudents] = useState(parent_student.filter(p => p.students.filter(ss => ss.teacherId == userContext.id)).flatMap(p => p.students).filter(ss => ss.teacherId == userContext.id))

    useEffect(() => {
        setTask({ ...task, studentId: students[0].studentId, surahId: _surahs[0].id, type: "Memorization", dueDate: `${tomorrowsDate().toDateString().substring(4)}` });
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name == "taskId" || name == "studentId" ||
            name == "surahId" || name == "fromAya" ||
            name == "toAya") value = parseInt(value);

        setTask({ ...task, [name]: value });
    };

    useEffect(()=>{setTask(prevTask => ({ ...prevTask, toAya: _surahs.find(s => s.id == task.surahId)?.ayaCount}));  },[task.surahId])

    const handleSubmit = (e) => {
        e.preventDefault();

        taskService.create(task);
        setSuccess(true)
        setTask({ ...task, studentId: students[0].studentId, surahId: _surahs[0].id, type: "Memorization", dueDate: `${tomorrowsDate().toDateString().substring(4)}` });
    };

    useEffect(()=>{
        const timeout = setTimeout(() => {
            setSuccess(false)
          }, 3000);

        return () => {
            clearTimeout(timeout);
          };
    },[success])

    return (
        <div style={{ marginBottom: "10px" }}>
            <Stack flexDirection="row" >
                <Typography
                    variant="h5"
                    sx={{ fontSize: "20px", marginBottom: "0px", fontFamily: "unset", textDecorationLine: "underline" }}
                >
                    Assign Student Tasks
                </Typography>
            </Stack>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Stack
                    flexDirection="row"

                >
                    <Stack
                        flexDirection="column"
                        sx={{ width: "3500px", alignItems: "center" }}
                    >
                        <Stack flexDirection="row" sx={{ marginTop: "15px" }}>
                            <Typography
                                sx={{
                                    marginTop: "20px",
                                    marginRight: "20px",
                                    color: "#3A3B3C",
                                }}
                            >
                                Student
                            </Typography>
                            <Select
                                size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={task.studentId}
                                name="studentId"
                                onChange={handleChange}
                                sx={{ marginTop: "10px", width: "278px" }}
                            >
                                {students.map(s => <MenuItem key={s.studentId} value={s.studentId}>{s.firstName}</MenuItem>)}
                            </Select>
                        </Stack>

                        <Stack flexDirection="row" sx={{ marginTop: "15px" }}>
                            <Typography
                                sx={{
                                    marginTop: "20px",
                                    marginRight: "32px",
                                    color: "#3A3B3C",
                                }}
                            >
                                Surah
                            </Typography>
                            <Select
                                size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={task.surahId}
                                name="surahId"
                                onChange={handleChange}
                                sx={{ marginTop: "10px", width: "278px" }}
                                inputProps={{ "aria-label": "Halaqa" }}
                            >
                                {_surahs.map(s => <MenuItem key={s.id} value={s.id}>{s.englishName} {`(${s.ayaCount})`}</MenuItem>)}
                            </Select>
                        </Stack>


                    </Stack>

                    <Stack
                        flexDirection="column"
                        sx={{ width: "350px", alignItems: "center", marginLeft: "100px" }}
                    >
                        <Stack
                            flexDirection="row"
                            sx={{ width: "350px", marginTop: "10px" }}
                        >
                            <TextField
                                size="small"
                                sx={{ width: "150px" }}
                                margin="normal"
                                required
                                type="number"
                                value={task.fromAya}
                                name="fromAya"
                                label="Aya Start"
                                id="fromAya"
                                onChange={handleChange}
                            />
                            <RemoveIcon sx={{ marginTop: "25px", marginX: "20px" }} />
                            <TextField
                                size="small"
                                sx={{ width: "150px" }}
                                margin="normal"
                                required
                                type="number"
                                value={task.toAya}
                                name="toAya"
                                label="Aya Finish"
                                id="toAya"
                                onChange={handleChange}
                            />
                        </Stack>
                        <TextField
                            size="small"

                            margin="normal"
                            fullWidth
                            required
                            value={task.dueDate}
                            name="dueDate"
                            label="Due Date"
                            id="dueDate"
                            onChange={handleChange}
                        />



                    </Stack>


                </Stack>

                <Stack flexDirection="row" sx={{ marginTop: "30px", marginLeft: "330px" }}>
                    <Typography
                        sx={{
                            marginTop: "10px",
                            marginRight: "22px",
                            color: "#3A3B3C",
                        }}
                    >
                        Task Type
                    </Typography>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={task.type}
                        name="type"
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value="Memorization"
                            control={<Radio />}
                            label="Memorization"

                        />
                        <FormControlLabel
                            value="Revision"
                            control={<Radio />}
                            label="Revision"
                        />
                    </RadioGroup>
                </Stack>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, marginLeft: "340px", width: "300px", marginY: "40px", backgroundColor: "#254e58" }}
                    onClick={handleSubmit}
                >
                    Add Task
                </Button>
                <Alert severity="success" sx={{display: !success && 'none' }}>Successfully Added Task!</Alert>
                <hr style={{ border: "1px lightgray rounded", width: "900px", marginBottom: "20px", marginTop:"40px" }}></hr>
            </Box>
        </div>
    );
}