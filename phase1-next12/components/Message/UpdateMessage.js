import { Dialog, DialogTitle, TextField, Stack, Typography, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { messageService } from "../../services/messages-service";

const styleBlock = {
  margin: {
    width: "350px"
  },
};

export default function UpdateMessage({ onClose, open, message: msg, selectedValue }) {
  const [message, setMessage] = useState({});

  useEffect(() => {
    setMessage({
      id: msg.id,
      senderID: msg.senderID,
      recepientID: msg.recepientID,
      text: msg.text,
      date: msg.date
    })
  }, [open])


  const handleMessageChange = (e) => {
    let value = e.target.value;

    setMessage({ ...message, text: value });
  };

  const updateMessage = () => {
    messageService.update(msg.id, message)
    handleClose()
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Update Message</DialogTitle>
     <Stack sx={{alignItems:"center"}}>
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
        />

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



