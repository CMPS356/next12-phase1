import Logout from "./Logout";
import Profile from "./Profile";
import { useRouter } from "next/router";

export default function Banner(){
  const router = useRouter()

    return( <>   
    <div
        style={{
          backgroundColor: "#254e58",
          height: "105px",
        }}
      >
        <nav style={{ display: "flex", justifyContent: "space-between" }}>
          <h2
            style={{
              paddingBotton: "20px",
              marginLeft: "60px",
              letterSpacing: "9px",
              fontSize: "40px",
              color: "#FAF9F6",
            }}
          >
            <i
              className="fas fa-kaaba"
              style={{ fontSize: "48px", color: "white" }}
            ></i>
            HalaqaMetrash
          </h2>

          <nav style={{ display: router.pathname=='/' ? 'none' : 'flex', justifyContent: "end", gap: "50px"}}>
            <Profile />
            <Logout />
          </nav>

        </nav>
      </div>
        </> )
}