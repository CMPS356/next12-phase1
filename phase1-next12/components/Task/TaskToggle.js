import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function TaskToggle({ setCompleteDate , val}) {
    const [checked, setChecked] = useState(false)

    useEffect(()=>{
        setChecked(val);
        setCompleteDate(val)
    },[val])

    const handleChange = (event) => {
        setChecked(event.target.checked);
        setCompleteDate(event.target.checked)
      };

    return (
        <>
            <Checkbox
                sx={{ marginLeft: "50px" }}
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
            />
        </>
    );
}