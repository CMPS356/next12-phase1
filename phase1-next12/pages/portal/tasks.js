import Tasks from "../../components/Task/Tasks"
import AddTask from "../../components/Task/AddTask"
import { Typography } from "@mui/material"
import TasksViewer from "../../components/Task/TasksViewer"


export default function Home() {
  return (<>
    {/* <h2 style={{marginBottom: "80px"}}>Students Tasks</h2> */}
    <AddTask />
    <Typography
                    variant="h5"
                    sx={{ fontSize: "20px", marginBottom: "30px", fontFamily: "unset", textDecorationLine: "underline" }}
                >
                    Tasks List
                </Typography>
    <Tasks />
    <TasksViewer />
  </>
  )
}