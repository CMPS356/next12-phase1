import Tasks from "../../components/Task/Tasks"
import AddTask from "../../components/Task/AddTask"
import { Typography } from "@mui/material"
import TasksViewer from "../../components/Task/TasksViewer"
import Box from "@mui/material/Box"


export default function Home() {
  return (<>
    {/* <h2 style={{marginBottom: "80px"}}>Students Tasks</h2> */}
    <AddTask />
    <Box sx={{ padding: "15px" , backgroundColor:'#ADC1C9', borderRadius:"5px"}}>
            <Typography
                variant="h5"
                sx={{ fontFamily: "serif", letterSpacing: "2px", fontWeight: "bold", fontSize: "27px", fontFamily: "unset", textDecorationLine: "none", color:"white" }}
                >
                &nbsp;Tasks
            </Typography></Box>
                <hr style={{ border: "1px lightgray rounded", width: "900px", marginTop: "20px" }}></hr>

    
    <Tasks />
    <TasksViewer />
  </>
  )
}