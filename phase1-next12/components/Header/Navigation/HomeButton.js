import Link from "next/link";
import { Button } from "@mui/material";
import { useLoginStore } from "../../../stores/loginStore";

const styleBlock = {
    Button: {
        marginY: "14px",
        width: "20px",
        height: "50px",
        marginRight: "30px"
    },
    Link: { textDecoration: "none", color: "#254e58", fontFamily: "serif", letterSpacing: "2px", fontSize: "15px", fontWeight: "bold" }
}

export default function HomeButton({ text, link, icon, roles }) {
    const userContext = useLoginStore(state => state.userContext)


    return (<>
        <h6 style={{ color: "#ADC1C9" }}>{JSON.stringify(roles.includes(userContext.role))}</h6>
        <Link
            href={link}
            style={{ ...styleBlock.Link, display: !roles.includes(userContext.role) && "none" }}
        >

            <a>
                <Button variant="text" sx={{ ...styleBlock.Button, display: !roles.includes(userContext.role) && "none" }}>

                    <i
                        className={icon}
                        style={{ fontSize: "30px", color: "#254e58" }}
                    >{"    " + text}
                    </i>
                </Button>
            </a>
        </Link>
        <div style={{borderLeft: "1px solid #254e58", height: "55px", marginTop: "14px", marginBottom: "10px"}}></div>
    </>)
}
