import { Dialog, DialogTitle, TextField, Typography, Button, RadioGroup, Radio } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import {
    FormControlLabel,
    MenuItem,
    Select
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import { Stack } from "@mui/system";
const _surahs = require('../../data/surah.json')
import { taskService } from "../../services/tasks-service";

const styleBlock = {
    margin: {
        width: "350px"
    },
};


//Shows a dialog screen to update (Sura, the Aya range, the due date, the type of task 'Memorization or Revision')
export default function Comments({ onClose, open, task: _task, selectedValue }) {
    const [task, setTask] = useState({});

    useEffect(() => {
        setTask({
            studentId: _task.studentId, //int
            surahId: _task.surahId,
            fromAya: _task.fromAya,
            toAya: _task.toAya,
            type: _task.type,
            dueDate: _task.dueDate, //int
        })
    }, [open])

    const updateTask = () => {
        taskService.update(_task.taskId, task)
        handleClose()
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        taskService.create(task);

        setTask({ ...task, studentId: students[0].studentId, surahId: _surahs[0].id });
    };

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name == "taskId" || name == "studentId" ||
            name == "surahId" || name == "fromAya" ||
            name == "toAya") value = parseInt(value);

        setTask({ ...task, [name]: value });
    };

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <DialogTitle sx={{ marginLeft: "25px", marginTop: "10px" }}>Feedback to Student</DialogTitle>
            <hr style={{ border: "1px lightgray rounded", width: "500px" }}></hr>
            {JSON.stringify(task)}



            <Stack
                flexDirection="column"
                sx={{ width: "390px", alignItems: "center", marginLeft: "100px" }}
            >
                <TextField
                    size="small"
                    margin="normal"
                    fullWidth
                    required
                    value={task.dueDate}
                    name="dueDate"
                    label="Comments"
                    id="dueDate"
                    onChange={handleChange}
                />
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
                                <Typography
                        sx={{
                            marginTop: "30px",
                            marginRight: "250px",
                        }}
                    >
                        Mastery Level:
                    </Typography>

                <Stack flexDirection="row" sx={{ marginTop: "30px", marginLeft: "350px", width: "600px" }}>

                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={task.type}
                        defaultValue={_task.type}
                        name="type"
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value="excellent"
                            control={<Radio />}
                            label="Excellent"

                        />
                        <FormControlLabel
                            value="ok"
                            control={<Radio />}
                            label="Ok"
                        />
                        <FormControlLabel
                            value="poor"
                            control={<Radio />}
                            label="Poor"
                        />
                    </RadioGroup>
                </Stack>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, width: "390px", marginY: "40px", backgroundColor: "#254e58" }}
                    onClick={updateTask}
                >
                    Add Task
                </Button>
            </Stack>
        </Dialog>
    );
}