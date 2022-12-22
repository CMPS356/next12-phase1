import { Dialog, DialogTitle, TextField, Stack, Typography, Button, RadioGroup, FormControlLabel, Radio} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { announcementService } from "../../services/announcements-service";

const styleBlock = {
    margin: {
      width: "350px"
    },
  };

export default function UpdateAnnouncement ({ onClose, open, announcement: ann, selectedValue }) {
  const [announcement, setAnnouncement] = useState({});

  useEffect(() => {
    setAnnouncement({
        id: ann.id, 
        text: ann.text,
        date: ann.date
      })
  },[open])

 
  const handleAnnouncementChange = (e) => {
    let value = e.target.value;

    setAnnouncement({ ...announcement, text: value });
  };

  const updateAnnouncement = () => {
    announcementService.update(ann.id, announcement)
    handleClose()
  }

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>Update Announcement</DialogTitle>
     <Stack sx={{alignItems:"center"}}>
     <TextField
          sx={{ width: "400px", justifyContent: "center"}}
          size="small"
          margin="normal"
          required
          fullWidth
          multiline
          name="announcement"
          value={announcement.text}
          label="Announcement"
          id="announcement"
          width="3px"
          onChange={handleAnnouncementChange}
        />

        <Button
          type="button"
          variant="contained"
          sx={{ width: "300px", mb: 2, marginY: "40px", backgroundColor: "#254e58" }}
          onClick={updateAnnouncement}
        >
          UPDATE ANNOUNCEMENT
        </Button>

     </Stack>
       

    </Dialog>
  );
};



