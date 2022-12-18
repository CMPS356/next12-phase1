import { Stack } from "@mui/material";
import HomeButton from "./HomeButton";
import NavOption from "./NavOption";

export default function Navbar() {

  return (
    <>
      <Stack flexDirection={"row"} sx={{backgroundColor: "#ADC1C9"}}>
        <HomeButton text='' link='/portal/' icon='fa fa-home' roles={['coordinator', 'parent', 'teacher']}/>
        <NavOption text='Register' link='/portal/register' icon='fas fa-key' roles={['coordinator']} />
        <h1>&nbsp;</h1>
        <NavOption text='Student List' link='/portal/students' icon='fas fa-key' roles={['coordinator']}/>
        <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        <NavOption text='Announcements' link='/portal/announcements' icon='fa fa-bullhorn' roles={['coordinator', 'parent', 'teacher']} />
        <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        <NavOption text='Messages' link='/portal/messages' icon='fa fa-comments' roles={['coordinator', 'parent', 'teacher']} />
        <NavOption text='Tasks' link='/portal/tasks' icon='fa fa-edit' roles={['coordinator', 'parent', 'teacher']} />
      </Stack>
    </>
  );
};


