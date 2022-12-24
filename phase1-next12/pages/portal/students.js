
const parents_students = require("../../data/parent-student.json");
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Avatar from "@mui/material/Avatar";
import { Stack } from "@mui/system";
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

  return (<>
    <Stack flexDirection="row" >
    <div style={{ padding: "20px 20px 0px 20px", marginRight: "10px", borderRadius:"3px", height:"78px", backgroundColor:"#E0E8EC"}}><HowToRegIcon fontSize="large" sx={{}}/></div>
    <Typography
      variant="h5"
      sx={{ fontSize: "27px", marginBottom: "30px", fontFamily: "unset" , textDecorationLine: "underline", backgroundColor:"#E0E8EC", padding: "20px", borderRadius:"3px", width:"100%"}}
    >
      Registered Students
    </Typography>
  </Stack>
  <div style={{borderTop:"1px lightgray ridge", maxWidth: "100%", marginBottom: "30px"}}></div>
    <Box sx={{ flexGrow: 1, width: "1000px", height: "80%", overflow: "auto" }}>
      <Grid item xs={12} md={6}>

        <Demo >
            <List sx={{ marginLeft: '35px', height: "90px"}}>
              {parents_students.map((s,i) =>
                s.students?.map((s,k) => (
                <>
                  <div style={{display: i==0 && k==0 ? 'flex' : 'none', justifyContent: "end",   width: "825px"}}>
                  <h5 style={{display: i==0 && k==0 ? 'block' : 'none', }}>ACTIVE?</h5>
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
    <div style={{borderTop:"1px Gray ridge", maxWidth: "100%"}}></div>
    </>
    
  );
}

//                                   