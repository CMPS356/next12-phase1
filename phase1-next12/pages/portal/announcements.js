
const announcements = require("../../data/announcements.json");
import { useEffect, useState } from "react";
import * as React from "react";
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
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import Paper from '@mui/material/Paper';
import { announcementService } from "../../services/announcements-service";
import { useLoginStore } from "../../stores/loginStore";
import UpdateAnnouncement from "../../components/Announcement/UpdateAnnouncement";

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function Page() {
    const userContext = useLoginStore(state => state.userContext)

    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState("value")
    const [announcement, setAnnouncement] = useState("")
    const [updateAnnouncement, setUpdateAnnouncement] = useState({})


    const handleClickOpen = (a) => {
        setUpdateAnnouncement(a)
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value)
    };

    const handleDelete = (announcement) => {
        console.log(announcement)
        announcementService.removeAnnouncement(announcement.id)

    };

    const handleAnnouncementChange = (e) => {
        const text = e.target.value;
        const newAnnouncement = { text: text }
        setAnnouncement(newAnnouncement);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // setAnnouncement({...announcement, date: Date.now})
        announcement.date = `${new Date().toDateString()} - ${new Date().toLocaleTimeString()}`
        announcementService.create(announcement);
        console.log({ announcement })
        announcement.text=""
        setAnnouncement(announcement)
        console.log(userContext.role)
    };

    return (
        <>
           <Box sx={{ padding: "15px" , backgroundColor:'#e4ebea', borderRadius:"5px"}}>
            <Typography
                variant="h5"
                sx={{ fontSize: "27px", fontFamily: "unset", textDecorationLine: "none"}}
            >
                &nbsp;Announcements
            </Typography></Box>
            <hr style={{ border: "1px lightgray rounded", width: "900px", marginTop: "20px" }}></hr>
            <Box sx={{ flexGrow: 1, width: "100%", height: "77%", overflow: "auto" }}>

                <Demo>

                    <List sx={{  height: "20%", width: "80%" }}>
                        {announcements.map((s, i) =>
                            <>

                                <ListItem
                                    sx={{ width: "100%", height: "100%" }}
                                    key={s}
                                    secondaryAction={
                                        userContext.role == "coordinator" ?
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
                                                    aria-label="update"
                                                    sx={{ marginLeft: "50px" }}
                                                    onClick={() => handleClickOpen(s)}
                                                >
                                                    <BorderColorIcon />
                                                </IconButton>
                                            </>
                                            :
                                            null

                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText sx={{ height: "100%", width: "100%", marginRight:"100px" }} primary={s.text} secondary={s.date} />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Demo>
                <hr style={{ border: "1px lightgray rounded", width: "1000px", marginTop: "20px" }}></hr>

            </Box>
            <TextField
                sx={{
                    width: "60%", display: userContext.role !== "coordinator" && "none" 
                }}
                multiline
                rows={4}
                value={announcement.text}
                label="Announcement"
                id="announcement"
                onChange={handleAnnouncementChange}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{marginTop:'30px',marginLeft: "70px", width: "30%", height: "6%", backgroundColor: "#254e58", display: userContext.role !== "coordinator" && "none"  }}
                onClick={handleSubmit}

            >
                Send New Announcement
            </Button>
            <UpdateAnnouncement
             open={open}
             announcement={updateAnnouncement}
             selectedValue={selectedValue}
             onClose={handleClose}
            />
        </>

    );
}

//                                   