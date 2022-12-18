import { Button } from "@mui/material";
import { useRouter } from "next/router";

export default function Logout() {
const router = useRouter()

  return (
    <Button variant="text" sx={{
      marginY: "4px",
      width: "220px",
      height: "50px",
    }} onClick={()=>{router.push('/')}}>
      <h3
        style={{
          marginRight: "50px",
          color: "#FAF9F6",
          letterSpacing: "2px",
        }}
      >
        <i
          className="fa fa-arrow-circle-right"
          style={{
            fontSize: "18px",
            color: "#FAF9F6",
            marginRight: "10px",
          }}
        ></i>
        Logout
      </h3>
    </Button>
  )
}