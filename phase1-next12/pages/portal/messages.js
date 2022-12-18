
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import { announcementService } from "../../services/announcements-service";
import { useLoginStore } from "../../stores/loginStore";
const parents_students = require("../../data/parent-student.json");
const _staff = require("../../data/staff.json");

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function Page() {
    const userContext = useLoginStore(state => state.userContext)

    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState("value")
    const [announcement, setAnnouncement] = useState("")
    const [student, setStudent] = useState([])
    const [parent, setParent] = useState([])

    let students;


    useEffect(() => {

        const parentStudent = parents_students.find((p) => p.parent?.id == userContext.id)


        if (userContext.role == "parent") {
            console.log(parents_students.find((ps) => ps.id == userContext.id))
        } else {
            students = parents_students.map((ps) => {
                ps.students?.map((s) => s.teacherId == userContext.id)
            })
        }


        console.log(parentStudent)
    }, [userContext]);

    
    useEffect(() => {

        
        console.log(parent)
    }, [parent]);


    const handleClickOpen = (a) => {
        setAnnouncement(a)
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
        announcement.text = ""
        setAnnouncement(announcement)
        console.log(userContext.role)
    };

    return (
        <>
            <Typography
                variant="h5"
                sx={{ fontSize: "27px", marginBottom: "0px", fontFamily: "unset", textDecorationLine: "none", marginBottom: "20px" }}
            >
                Messages
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-helper-label">Student</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={student}
                    label="Age"
                    onChange={/ TODO /}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{ flexGrow: 1, width: "100%", height: "80%", overflow: "auto" }}>

                <Demo>

                    {/* <List sx={{ height: "100%", width: "80%" }}>
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
                                    <ListItemText sx={{ height: "100%", width: "100%", marginRight: "100px" }} primary={s.text} secondary={s.date} />
                                </ListItem>
                            </>
                        )}
                    </List> */}
                </Demo>

            </Box>
            {/* <TextField
                size="large"
                sx={{
                    width: "60%", mt: 3, mb: 2, display: userContext.role !== "coordinator" && "none"
                }}
                margin="normal"
                fullWidth
                value={announcement.text}
                label="Announcement"
                id="announcement"
                onChange={handleAnnouncementChange}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, marginLeft: "70px", width: "30%", height: "6%", backgroundColor: "#254e58", display: userContext.role !== "coordinator" && "none" }}
                onClick={handleSubmit}

            >
                Send New Announcement
            </Button> */}

        </>

    );
}

//                                   