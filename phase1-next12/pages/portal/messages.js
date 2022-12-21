
const _messages = require("../../data/messages.json");
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
import ChatIcon from '@mui/icons-material/Chat';
import { useLoginStore } from "../../stores/loginStore";
import UpdateMessage from "../../components/Message/UpdateMessage";
import { messageService } from "../../services/messages-service";
const parents_students = require("../../data/parent-student.json");
const _staff = require("../../data/staff.json");

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function Page() {
    const userContext = useLoginStore(state => state.userContext)

    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState("value")
    const [message, setMessage] = useState({})
    const [updateMessage, setUpdateMessage] = useState({})
    const [students, setStudents] = useState([])
    const [student, setStudent] = useState(null)
    const [messages, setMessages] = useState([])
    function getStudents() {
        if (userContext.role == "parent") {
            const parent = parents_students?.find((ps) =>
                ps.id == userContext.id
            )
            // console.log(parent.students)
            setStudents(parent.students)
            // return parent.students
            console.log(students)

        } else if (userContext.role == "coordinator") {
            setStudents(parents_students.flatMap(p => p.students))
        }
        else {
            setStudents(
                parents_students.filter(p => p.students.filter(ss => ss.teacherId == userContext.id)).flatMap(p => p.students).filter(ss => ss.teacherId == userContext.id)

            )
        }


    }

    useEffect(() => {
        getStudents()

    }, [userContext]);

    // useEffect(() => {
    //     getStudents()
    //     console.log(student)

    // }, [students]);

    useEffect(() => {
        // setMessages(_messages.filter((m) => m.recepientID == student?.studentId))


    }, [student]);

    const handleClick = (s) => {
        setStudent(s)
        console.log(s)
        console.log(messages)

    }
    const handleClickOpen = (m) => {
        setUpdateMessage(m)
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value)
    };

    const handleDelete = (message) => {
        console.log(message.id)
        messageService.removeMessage(message.id)
    };

    const handleMessageChange = (e) => {
        const text = e.target.value;
        const newMessage = { text: text, senderID: userContext.id, recepientID: student?.studentId }
        setMessage(newMessage);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        message.date = `${new Date().toDateString()} - ${new Date().toLocaleTimeString()}`
        messageService.create(message);
        console.log({ message })
        message.text = ""
        setMessage(message)
    };

    return (
        <>
                    <Box sx={{ padding: "15px" , backgroundColor:'#e4ebea', borderRadius:"5px"}}>

            <Typography
                variant="h5"
                sx={{ fontSize: "27px", fontFamily: "unset", textDecorationLine: "none"}}
            >
               &nbsp; Messages
            </Typography></Box>
            <hr style={{ border: "1px lightgray rounded", width: "900px", marginTop: "20px" }}></hr>

            <Box sx={{ flexGrow: 1, width: "100%", height: "30%", overflow: "auto", marginBottom: "20px" }}>

                <Demo>

                    <List sx={{ height: "10%", width: "100%" }}>
                        {students?.map((s, i) =>
                            <>

                                <ListItem
                                    sx={{ width: "550px", height: "110%" }}
                                    key={s}
                                    secondaryAction={

                                        <>
                                            <IconButton
                                                edge="end"
                                                aria-label="student"
                                                onClick={() => handleClick(s)}
                                            >
                                                <ChatIcon />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText sx={{ height: "100%", width: "100%", marginRight: "100px" }} primary={s.studentId} secondary={s.firstName + " " + s.lastName} />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Demo>

            </Box>
            <hr style={{ border: "1px lightgray rounded", width: "900px", marginY: "50px" }}></hr>

            <Box sx={{ flexGrow: 1, width: "100%", height: "40%", overflow: "auto", outline: "solid", outlineColor: "#FAF9F6", padding: "15px" , backgroundColor:'#e4ebea', borderRadius:"5px", marginTop: "20px"}}>
                <h2 sx={{ display: student && "none" }}>&nbsp; Chat with {student?.firstName} {student?.lastName}</h2>
                

                    <List sx={{width: "100%" }}>
                        {_messages.filter(m => student?.studentId == m.recepientID).map((m, i) =>
                            <Demo>
                                <ListItem
                                    sx={{ width: "550px", height: "60px" }}
                                    key={m.id}
                                    secondaryAction={
                                        userContext.role == "teacher" ?
                                            <>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => handleDelete(m)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>

                                                <IconButton
                                                    edge="end"
                                                    aria-label="update"
                                                    sx={{ marginLeft: "50px" }}
                                                    onClick={() => handleClickOpen(m)}
                                                >
                                                    <BorderColorIcon />
                                                </IconButton>
                                            </>
                                            :
                                            null
                                    }
                                > 

                                <ListItemText sx={{ marginRight: "20px" }} primary={`${m.text}`} secondary={m.date} />
                                </ListItem>
                                <div style={{height:"10px", backgroundColor:'#e4ebea', width: "200%"}}> </div >
                                </Demo>
                        )}
                        

                    </List>
                



            </Box>

            <TextField
                size="large"
                sx={{
                    width: "60%", mt: 3, mb: 2, display: userContext.role !== "teacher" && "none"
                }}
                margin="normal"
                fullWidth
                value={message.text}
                label="Message"
                id="message"
                onChange={handleMessageChange}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, marginLeft: "70px", width: "30%", height: "6%", backgroundColor: "#254e58", display: userContext.role !== "teacher" && "none" }}
                onClick={handleSubmit}

            >
                Send Message
            </Button>
            <UpdateMessage
            open={open}
            message={updateMessage}
            selectedValue={selectedValue}
            onClose={handleClose}
            />
        </>


    );
}

//                                   