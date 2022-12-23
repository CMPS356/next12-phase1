import { Dialog, DialogTitle, TextField, Stack, Typography, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { messageService } from "../../services/messages-service";

const styleBlock = {
  margin: {
    width: "350px"
  },
};

export default function UpdateMessage({ onClose, open, message: msg, selectedValue }) {
  const [message, setMessage] = useState({});
  const [orgImages, setOrgImages] = useState(msg.images)
  const [images, setImages] = useState([])
  const [imageURLs, setimageURLs] = useState([])

  useEffect(() => {
    setMessage({
      id: msg.id,
      senderID: msg.senderID,
      recepientID: msg.recepientID,
      text: msg.text,
      images: msg.images,
      date: msg.date
    })
  }, [open])

  const handleImageChange = (e) => {
    setImages([...e.target.files])
  }

  useEffect(() => {
    if (images?.length < 1) return;
    const newImageURLs = []
    images?.forEach(image => newImageURLs.push(URL.createObjectURL(image)))
    setimageURLs(newImageURLs)
    console.log(imageURLs)
    { images?.map((img) => console.log(img.name)) }
    console.log(message.images)
  }, [images])

  useEffect(() => {
    setMessage({ ...message, images: imageURLs })
  }, [imageURLs])

  const handleMessageChange = (e) => {
    console.log(imageURLs)
    let value = e.target.value;
    setMessage({ ...message, text: value });

  };

  const updateMessage = () => {
    console.log(imageURLs)
    messageService.update(msg.id, message)
    handleClose()
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Update Message</DialogTitle>
      <Stack sx={{ alignItems: "center" }}>
        <TextField
          sx={{ width: "300px", justifyContent: "center" }}
          size="small"
          margin="normal"
          required
          fullWidth
          name="message"
          value={message.text}
          label="Message"
          id="message"
          width="3px"
          onChange={handleMessageChange}
          multiline
          rows={4}
        />
        <Button variant="contained" component="label" sx={{ backgroundColor: "#254e58", mr: 1 }}>
          <AddPhotoAlternateIcon />

          Upload Images
          <input hidden accept="image/*" multiple type="file" onChange={handleImageChange} />
        </Button>

        <p>{message?.images?.length} images uploaded</p>

        <Button
          type="button"
          variant="contained"
          sx={{ width: "300px", mb: 2, marginY: "40px", backgroundColor: "#254e58" }}
          onClick={updateMessage}
        >
          UPDATE MESSAGE
        </Button>

      </Stack>


    </Dialog>
  );
};



