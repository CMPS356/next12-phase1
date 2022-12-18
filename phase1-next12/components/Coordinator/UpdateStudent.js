import { Dialog, DialogTitle, TextField, Stack, Typography, Button, RadioGroup, FormControlLabel, Radio} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { studentService } from "../../services/student-service";

const styleBlock = {
    margin: {
      width: "350px"
    },
  };

const UpdateStudent = ({ onClose, open, student: stud, selectedValue }) => {
  const [student, setStudent] = useState({});

  useEffect(() => {
    setStudent({
        studentId: stud.studentId, //int
        firstName: stud.firstName,
        lastName: stud.lastName,
        dob: stud.dob,
        gender: stud.gender,
        schoolGrade: stud.schoolGrade, //int
        teacherId: stud.teacherId //int
      })
  },[open])

  const updateStudent = () => {
    studentService.update(stud.studentId, student)
    handleClose()
  }

  const handleStudentChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name == "schoolGrade" || name == "studentId") value = parseInt(value);

    setStudent({ ...student, [name]: value });
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Update Student Information</DialogTitle>
      {/* {JSON.stringify(student)} */}


      <Stack
              flexDirection="column"
              sx={{ width: "100", alignItems: "center" }}
            >

              <Stack flexDirection="row" justifyContent="space-between">
                <TextField
                  sx={{ width: "160px" }}
                  size="small"
                  margin="normal"
                  required
                  fullWidth
                  name="firstName"
                  value={student.firstName}
                  label="First Name"
                  id="firstName"
                  width="3px"
                  onChange={handleStudentChange}
                />
                <TextField
                size="small"
                  sx={{ width: "160px", marginLeft: "30px" }}
                  margin="normal"
                  required
                  fullWidth
                  value={student.lastName}
                  name="lastName"
                  label="Last Name"
                  id="lastName"
                  onChange={handleStudentChange}
                />
              </Stack>
              <TextField
              size="small"
              sx={styleBlock.margin}
                margin="normal"
                required
                type="number"
                fullWidth
                value={student.studentId}
                name="studentId"
                label="Student ID"
                id="studentId"
                onChange={handleStudentChange}
              />
              <TextField
              size="small"
                sx={styleBlock.margin}
                margin="normal"
                required
                fullWidth
                value={student.dob}
                name="dob"
                label="Date of Birth - DD/MM/YYYY"
                id="password"
                onChange={handleStudentChange}
              />
              <Stack flexDirection="row" sx={{ marginTop: "18px" }}>
                <Typography
                  sx={{
                    marginTop: "10px",
                    marginRight: "80px",
                    color: "#3A3B3C",
                  }}
                >
                  Gender
                </Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={student.gender}
                  defaultValue={stud.gender}
                  name="gender"
                  onChange={handleStudentChange}
                >
                  <FormControlLabel
                    value="F"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="M"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </Stack>
              <TextField
              size="small"
              sx={styleBlock.margin}
                margin="normal"
                required
                fullWidth
                type="number"
                value={student.schoolGrade}
                name="schoolGrade"
                label="School Grade"
                id="schoolGrade"
                onChange={handleStudentChange}
              />


              <Button
                type="button"
                
                variant="contained"
                sx={{ mt: 3, mb: 2, marginY: "40px", backgroundColor:"#254e58"}}
                onClick={updateStudent}
              >
                UPDATE STUDENT INFO
              </Button>
            </Stack>

    </Dialog>
  );
};

export default UpdateStudent;


// {
//     "studentId": 1,
//     "firstName": "Ibn Juha",
//     "lastName": "Dahak",
//     "dob": "1/1/2009",
//     "gender": "M",
//     "schoolGrade": 4,
//     "teacherId": 501
//   },