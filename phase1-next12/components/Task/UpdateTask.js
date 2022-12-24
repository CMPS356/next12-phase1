import { Dialog, DialogTitle, TextField, Typography, Button, RadioGroup, Radio} from "@mui/material";
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
export default function UpdateTask({ onClose, open, task: _task, selectedValue }){
    const [task, setTask] = useState({});

    useEffect(() => {
      setTask({
          taskId: _task.taskId,
          studentId: _task.studentId, //int
          surahId: _task.surahId,
          fromAya: _task.fromAya,
          toAya: _task.toAya,
          type: _task.type,
          dueDate: _task.dueDate, //int
        })
    },[open])
  
    const updateTask = () => {
      taskService.update(_task.taskId, task)
      handleClose()
    }

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
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle sx={{marginLeft: "25px"}}>Update Task Information</DialogTitle>
        <hr style={{border: "1px lightgray rounded", width: "500px"}}></hr>
              {/* {JSON.stringify(task)} */}

                    <Stack
                        flexDirection="column"
                        sx={{ width: "350px", alignItems: "center" , marginLeft: "80px"}}
                    >
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
                                value={task.surahId || _task.surahId}
                                name="surahId"
                                onChange={handleChange}
                                sx={{ marginTop: "10px", width: "278px" }}
                                inputProps={{ "aria-label": "Halaqa" }}
                            >
                                {_surahs.map(s => <MenuItem key={s.id} value={s.id}>{s.englishName}</MenuItem>)}
                            </Select>
                        </Stack>

                        
                    </Stack>

                    <Stack
                        flexDirection="column"
                        sx={{ width: "350px", alignItems: "center", marginLeft: "80px" }}
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
                        <Typography
                            sx={{
                                marginTop: "20px",
                                marginRight: "270px",
                                color: "#3A3B3C"
                            }}
                        >
                         Task Type:
                        </Typography>
                <Stack flexDirection="row" sx={{ marginTop: "30px", marginLeft:"60px", width: "300px"}}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={task.type}
                            defaultValue={_task.type}
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
                    sx={{ mt: 3, mb: 2, width: "300px", marginY:"40px", backgroundColor: "#254e58" }}
                    onClick={updateTask}
                >
                    Update Task
                </Button>
                </Stack>
      </Dialog>
    );
}