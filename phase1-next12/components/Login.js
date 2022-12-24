import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { useLoginStore } from "../stores/loginStore";
import Banner from "./Header/Banner/Banner";
const parents_students = require("../data/parent-student.json");
const _staff = require("../data/staff.json");

//Login user if they exist in the database
//Direct users to portal

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const setUserContext = useLoginStore(state => state.setUserContext)
  const userContext = useLoginStore(state => state.userContext)
  const router = useRouter();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const parentStudent = parents_students.find((p) => p.parent?.email == user.email)

    if (parentStudent && parentStudent.parent.password == user.password) {
      setUserContext({ id: parentStudent.id, role: "parent" })
      router.push('/portal/announcements')
      return;
    }

    const staff = _staff.find((staff) => staff.email == user.email);

    if (!staff) { alert(404); return }

    if (staff?.isCoordinator && staff.password == user.password) {
      setUserContext({ id: staff.staffNo, role: "coordinator" })
      router.push('/portal/announcements')
      return;
    } else if(staff.password == user.password){
      setUserContext({ id: staff.staffNo, role: "teacher" }); router.push('/portal/announcements');
    }else{
      alert(404); return 
    }
  }

  useEffect(() => { console.log(userContext.role) }, [userContext])

  return (
    <>
      <Banner />
      {/* <div style={{ marginLeft: "20px" }}>
        <h4>Examples</h4>
        <h5>parent: &nbsp; Mohammed304@hotmail.com</h5>
        <h5>teacher: &nbsp; teacher1@halaqa.org</h5>
        <h5>coordinator: &nbsp; coordinator@halaqa.org</h5>
        <h5>Password for All: &nbsp; password</h5>
      </div> */}
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#edf5f7",
            borderRadius: "30px",
            padding: "50px"
          }}
        >
          <Stack flexDirection="row" gap={'10px'} sx={{ marginBottom: "40px" }}>
            <i className="fa fa-user" aria-hidden="true" style={{ fontSize: "50px", marginRight: "10px" }}></i>
            <Typography component="h1" variant="h4" sx={{ marginTop: "10px" }}>
              Login
            </Typography>
          </Stack>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#254e58" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
