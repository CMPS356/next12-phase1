
const parents_students = require("../../data/parent-student.json");
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
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
import UpdateStudent from "../../components/Coordinator/UpdateStudent";
import { studentService } from "../../services/student-service";
import StatusToggle from "../../components/Coordinator/StatusToggle";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Page() {
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState("value")
  const [student, setStudent] = useState({})

  const setStatus = (student, status) => {
    console.log (student, status)

    studentService.update(student.studentId, {...student, isActive: status})
  }

  const handleClickOpen = (s) => {
    setStudent(s)
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value)
  };

  const handleDelete = (student) => {
    studentService.removeStudent(student.studentId)
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Typography
          variant="h5"
          sx={{ fontSize: "27px", marginBottom: "0px", fontFamily: "unset", textDecorationLine: "underline" }}
        >
          Registerd Students List
        </Typography>
        <Demo>
            <List sx={{ marginLeft: '100px', height: "90px" }}>
              {parents_students.map((s,i) =>
                s.students?.map((s,k) => (
                <>
                  <div style={{display: i==0 && k==0 ? 'flex' : 'none', justifyContent: "end",   width: "815px"}}>
                  <h5 style={{display: i==0 && k==0 ? 'block' : 'none', }}>STATUS</h5>
                  </div>
                  <ListItem
                    sx={{ width: "850px", height: "70px" }}
                    key={s}
                    secondaryAction={
                      <>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(s)}
                        >
                          <DeleteIcon />
                        </IconButton>

                        <IconButton
                          edge="end"
                          aria-label="delete"
                          sx={{ marginLeft: "50px" }}
                          onClick={() => handleClickOpen(s)}
                        >
                          <BorderColorIcon />
                        </IconButton>
                        <StatusToggle setStatus={(v) => setStatus(s,v)} toggle={s.isActive ?? 'true'}/>
                      </>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon /> 
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${s.studentId} - ${s.firstName}, ${s.lastName}`} />
                  </ListItem>
                </>
                ))
              )}
            </List>
        </Demo>
        <UpdateStudent
          open={open}
          student={student}
          selectedValue={selectedValue}
          onClose={handleClose}
        />
      </Grid>
    </Box>
  );
}

//                                   