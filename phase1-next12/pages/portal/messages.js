
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
import Image from 'next/image'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Stack } from "@mui/system";

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
    const [images, setImages] = useState([])
    const [imageURLs, setimageURLs] = useState([])

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

    const handleImageChange = (e) => {
        setImages([...e.target.files])
    }

    useEffect(() => {
        if (images.length < 1) return;
        const newImageURLs = []
        images.forEach(image => newImageURLs.push(URL.createObjectURL(image)))
        setimageURLs(newImageURLs)
        console.log(images)
        _messages.filter(m => student?.studentId == m.recepientID).map((i) => console.log(i.images))
        { images?.map((img) => console.log(img.name)) }
    }, [images])

    useEffect(() => {
        setMessage({ ...message, images: imageURLs })
    }, [imageURLs])

    const handleMessageChange = (e) => {
        const text = e.target.value;
        const newMessage = { text: text, images: imageURLs, senderID: userContext.id, recepientID: student?.studentId }
        setMessage(newMessage);
        console.log(imageURLs)

    };


    const handleSubmit = (e) => {
        e.preventDefault();

        message.date = `${new Date().toDateString()} - ${new Date().toLocaleTimeString()}`
        messageService.create(message);
        console.log({ message })
        message.text = ""
        setMessage(message)
        message.images.map((img) => console.log(img))
    };


    return (
        <>
            <Box sx={{ padding: "15px", backgroundColor: '#ADC1C9', borderRadius: "5px", width: "900px" }}>
                <Typography
                    variant="h5"
                    sx={{ fontFamily: "serif", letterSpacing: "2px", fontWeight: "bold", fontSize: "27px", fontFamily: "unset", textDecorationLine: "none", color:"white" }}
                >
                    &nbsp;Messages
                </Typography></Box>
            <hr style={{ border: "1px lightgray rounded", width: "900px", marginTop: "20px" }}></hr>

            <Box sx={{ flexGrow: 1, width: "900px", height: "30%", overflow: "auto", marginBottom: "20px" }}>

                <Demo>

                    <List sx={{ height: "10%", width: "50%" }}>
                        {students?.map((s, i) =>
                            <>

                                <ListItem
                                    sx={{ width: "800px", height: "100%" }}
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
            <hr style={{ border: "1px lightgray rounded", width: "900px", marginTop: "30px", marginBottom: "30px" }}></hr>

            <Box sx={{ flexGrow: 1, width: "900px", height: "30%", overflow: "auto", outline: "solid", outlineColor: "#FAF9F6", padding: "15px" }}>
                <h2 style={{ display: !student && "none" }}>Chat with: {student?.firstName} {student?.lastName}</h2>
                <h2 style={{ display: student && "none" }}>Chat Box</h2>

                <Demo>

                    <List sx={{ height: "50%" }}>
                        {_messages.filter(m => student?.studentId == m.recepientID).map((m, i) =>
                            <>

                                <div style={{ backgroundColor: "#f8f8f8" }}>
                                    <ul style={{ listStyle: "none" }}>
                                        {m?.images?.map((image) => (
                                            <li key={image}>
                                                <img src={image} width={350} height={200} style={{padding:"10px"}} />
                                            </li>
                                        ))}
                                    </ul>
                                    <ListItem
                                        sx={{ width: "90%", height: "70px", marginBottom: 2 }}
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


                                        <ListItemText sx={{ padding: 2 }} primary={`${m.text}`} secondary={m.date} />

                                    </ListItem>
                                </div>

                            </>
                        )}

                    </List>
                </Demo>



            </Box>
            <Stack direction="row" sx={{ alignItems: "center", display: (userContext.role !== "teacher" || !student) && "none" }}>
                <TextField
                    size="large"
                    sx={{
                        width: "90%", mt: 3, mb: 2, mr: 2
                    }}
                    margin="normal"
                    fullWidth
                    value={message.text}
                    label="Message"
                    id="message"
                    onChange={handleMessageChange}
                    multiline
                    rows={2}
                />

                <Button variant="contained" component="label" sx={{ backgroundColor: "#254e58", mr: 2,  width: "300px", height:"70px" }}>
                    <AddPhotoAlternateIcon />
                    Upload Images
                    <input hidden accept="image/*" multiple type="file" onChange={handleImageChange} />
                </Button>

                <p>{images.length} images uploaded</p>



            </Stack>


            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, width: "900px", height: "6%", backgroundColor: "#254e58", display: (userContext.role !== "teacher" || !student) && "none" }}
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

