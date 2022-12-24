import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import { Stack } from "@mui/system";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { studentService } from "../../services/student-service";
import { formValidation, studentValidation } from "../../util/formValidation";
const staff = require("../../data/staff.json");

const styleBlock = {
  margin: {
    marginBottom: "18px",
    fontFamily: "unset",
  },
};

const initialStudentState = {
  studentId: "", //int
  firstName: "",
  lastName: "",
  dob: "",
  gender: "F",
  schoolGrade: "", //int
  teacherId: "", //int
};

const initialParentState = {
  qatariId: "", //int
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  username: "",
  password: "",
};

const initialError = {
  qatariId: { value: false, msg: "should be 11 numbers", isEmpty: false },
  mobile: { value: false, msg: "should be 8 numbers", isEmpty: false },
  email: { value: false, msg: "", isEmpty: false },
  username: { value: false, msg: "", isEmpty: false },
  password: { value: false, msg: "", isEmpty: false },

  firstNameParent: { value: false, msg: "", isEmpty: false },
  lastNameParent: { value: false, msg: "", isEmpty: false },

  studentId: { value: false, msg: "", isEmpty: false },
  firstName: { value: false, msg: "", isEmpty: false },
  lastName: { value: false, msg: "", isEmpty: false },
  dob: { value: false, msg: "", isEmpty: false },
  schoolGrade: { value: false, msg: "", isEmpty: false },
  teacherId: { value: false, msg: "", isEmpty: false },
};

const Register = () => {
  const [student, setStudent] = useState(initialStudentState);
  const [students, setStudents] = useState([]);
  const [parent, setParent] = useState(initialParentState);
  const [errors, setErrors] = useState(initialError);
  const [firstHalaqa, setFirstHalaqa] = useState(staff.find(s => !s.isCoordinator).staffNo)
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setStudent({ ...student, teacherId: firstHalaqa});
  }, []);

  const handleStudentChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name == "schoolGrade" || name == "studentId") value = parseInt(value);

    setStudent({ ...student, [name]: value });
  };

  const handleParentChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    if (name == "qatariId" || name == "mobile") value = parseInt(value);

    setParent({ ...parent, [name]: value });
  };

  const addStudent = () => {
    setErrors(initialError);

    if (studentValidation(student, setErrors)) return;

    setStudents((prevList) => [...prevList, student]);
    setStudent({...initialStudentState, teacherId: firstHalaqa});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(initialError);

    if (formValidation(parent, student, setErrors)) return;

    studentService.create({ parent, students: [...students, student] });

    setSuccess(true)

    setStudents([]);
    setParent(initialParentState);
    setStudent({...initialStudentState, teacherId: firstHalaqa});
  };

  useEffect(()=>{
    const timeout = setTimeout(() => {
        setSuccess(false)
      }, 4000);

    return () => {
        clearTimeout(timeout);
      };
   },[success])


  return (
    <>
    <Stack flexDirection="row" >
    <div style={{ padding: "20px 20px 0px 20px", marginRight: "10px", borderRadius:"3px", height:"78px", backgroundColor:"#E0E8EC"}}><HowToRegIcon fontSize="large" sx={{}}/></div>
    <Typography
      variant="h5"
      sx={{ fontSize: "27px", marginBottom: "30px", fontFamily: "unset" , textDecorationLine: "underline", backgroundColor:"#E0E8EC", padding: "20px", borderRadius:"3px", width:"100%"}}
    >
      Registeration
    </Typography>
  </Stack>
  <div style={{borderTop:"1px lightgray ridge", maxWidth: "100%",  marginBottom: "80px"}}></div>
        <Box
        sx={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Parent Information */}
          <Stack
            flexDirection="row"
            justifyContent="left"
            width="800px"
            gap="200px"
          >
            <Stack
              flexDirection="column"
              sx={{ width: "350px", alignItems: "center", marginLeft: "20px" }}
            >
              <Typography component="h1" variant="h5" sx={{...styleBlock.margin,  textDecorationLine: "underline"}}>
                Parent Information
              </Typography>
              <Stack flexDirection="row" justifyContent="space-between">
                {/* Parent information */}
                <TextField
                size="small"
                  sx={{ width: "160px" }}
                  helperText={
                    (errors.firstNameParent.value && "invalid") ||
                    (errors.firstNameParent.isEmpty && "Empty")
                  }
                  error={
                    (errors.firstNameParent.value && true) ||
                    (errors.firstNameParent.isEmpty && true)
                  }
                  margin="normal"
                  fullWidth
                  required
                  name="firstName"
                  value={parent.firstName}
                  label="First Name"
                  id="firstName"
                  onChange={handleParentChange}
                />
                <TextField
                size="small"
                  sx={{ width: "120px", marginLeft: "30px" }}
                  helperText={
                    (errors.lastNameParent.value && "invalid") ||
                    (errors.lastNameParent.isEmpty && "Empty")
                  }
                  error={
                    (errors.lastNameParent.value && true) ||
                    (errors.lastNameParent.isEmpty && true)
                  }
                  margin="normal"
                  required
                  fullWidth
                  name="lastName"
                  value={parent.lastName}
                  label="Last Name"
                  id="lastName"
                  onChange={handleParentChange}
                />
              </Stack>
              <TextField
              size="small"
                type="number"
                sx={styleBlock.margin}
                helperText={
                  (errors.qatariId.value && "invalid") ||
                  (errors.qatariId.isEmpty && "Empty")
                }
                error={
                  (errors.qatariId.value && true) ||
                  (errors.qatariId.isEmpty && true)
                }
                margin="normal"
                required
                fullWidth
                name="qatariId"
                value={parent.qatariId}
                label="Qatar Id"
                id="qatarId"
                onChange={handleParentChange}
              />
              <TextField
              size="small"
                sx={styleBlock.margin}
                helperText={
                  (errors.mobile.value && "invalid") ||
                  (errors.mobile.isEmpty && "Empty")
                }
                error={
                  (errors.mobile.value && true) ||
                  (errors.mobile.isEmpty && true)
                }
                type="number"
                margin="normal"
                required
                fullWidth
                value={parent.mobile}
                name="mobile"
                label="Mobile Number"
                id="qatarId"
                onChange={handleParentChange}
              />
              <TextField
              size="small"
                sx={styleBlock.margin}
                helperText={
                  (errors.email.value && "invalid") ||
                  (errors.email.isEmpty && "Empty")
                }
                error={
                  (errors.email.value && true) || (errors.email.isEmpty && true)
                }
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={parent.email}
                name="email"
                onChange={handleParentChange}
              />
              <TextField
              size="small"
                sx={styleBlock.margin}
                margin="normal"
                helperText={
                  (errors.username.value && "invalid") ||
                  (errors.username.isEmpty && "Empty")
                }
                error={
                  (errors.username.value && true) ||
                  (errors.username.isEmpty && true)
                }
                required
                fullWidth
                id="username"
                label="Username"
                value={parent.username}
                name="username"
                onChange={handleParentChange}
              />
              <TextField
              size="small"
                sx={styleBlock.margin}
                helperText={
                  (errors.password.value && "invalid") ||
                  (errors.password.isEmpty && "Empty")
                }
                error={
                  (errors.password.value && true) ||
                  (errors.password.isEmpty && true)
                }
                margin="normal"
                required
                fullWidth
                value={parent.password}
                name="password"
                label="Password"
                id="password"
                onChange={handleParentChange}
              />
            </Stack>

            {/* Student Information */}

            <Stack
              flexDirection="column"
              sx={{ width: "350px", alignItems: "center" }}
            >
              <Typography component="h1" variant="h5" sx={{...styleBlock.margin,  textDecorationLine: "underline"}}>
                Student {students.length+1} Information
              </Typography>

              <Stack flexDirection="row" justifyContent="space-between">
                <TextField
                  sx={{ width: "160px" }}
                  size="small"
                  helperText={
                    (errors.firstName.value && "invalid") ||
                    (errors.firstName.isEmpty && "Empty")
                  }
                  error={
                    (errors.firstName.value && true) ||
                    (errors.firstName.isEmpty && true)
                  }
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
                  helperText={
                    (errors.lastName.value && "invalid") ||
                    (errors.lastName.isEmpty && "Empty")
                  }
                  error={
                    (errors.lastName.value && true) ||
                    (errors.lastName.isEmpty && true)
                  }
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
                helperText={
                  (errors.studentId.value && "invalid") ||
                  (errors.studentId.isEmpty && "Empty")
                }
                error={
                  (errors.studentId.value && true) ||
                  (errors.studentId.isEmpty && true)
                }
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
                helperText={
                  (errors.dob.value && "invalid") ||
                  (errors.dob.isEmpty && "Empty")
                }
                error={
                  (errors.dob.value && true) || (errors.dob.isEmpty && true)
                }
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
                sx={{ marginTop: "30px" }}
                margin="normal"
                helperText={
                  (errors.schoolGrade.value && "invalid") ||
                  (errors.schoolGrade.isEmpty && "Empty")
                }
                error={
                  (errors.schoolGrade.value && true) ||
                  (errors.schoolGrade.isEmpty && true)
                }
                required
                fullWidth
                type="number"
                value={student.schoolGrade}
                name="schoolGrade"
                label="School Grade"
                id="schoolGrade"
                onChange={handleStudentChange}
              />

              <Stack flexDirection="row" sx={{ marginTop: "15px" }}>
                <Typography
                  sx={{
                    marginTop: "20px",
                    marginRight: "20px",
                    color: "#3A3B3C",
                  }}
                >
                  Halaqa
                </Typography>
                <Select
                size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={student.teacherId}
                  name="teacherId"
                  onChange={handleStudentChange}
                  sx={{ marginTop: "10px", width: "278px" }}
                  inputProps={{ "aria-label": "Halaqa" }}
                >
                  {staff.map((s, i) => {
                    if (!s.isCoordinator) {
                      return <MenuItem key={s.staffNo} value={s.staffNo}>{s.halaqa}</MenuItem>;
                    }
                  })}
                </Select>
              </Stack>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, marginTop: "40px", backgroundColor:"#254e58"}}
                onClick={addStudent}
              >
                Add Another Student
              </Button>
            </Stack>
          </Stack>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, marginLeft: "20px", width: "860px" , backgroundColor:"#254e58"}}
            onClick={handleSubmit}
          >
            Register
          </Button>
          <Alert severity="success" sx={{display: !success && 'none' , marginLeft: "50px"}}>Successfully Registerd Student!</Alert>
        </Box>
      </Box>
      {/* <div>{JSON.stringify(parent)}</div>
      <div></div>
      <div>{JSON.stringify(student)}</div>
      <div></div>
      <div>{JSON.stringify(students)}</div> */}
      {/* <div>{JSON.stringify(errors)}</div> */}
    </>
  );
};

export default Register;
