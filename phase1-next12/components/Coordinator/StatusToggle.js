import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';

export default function StatusToggle({setStatus, toggle: tog}) {
    const [toggle, setToggle] = useState(true)

    useEffect(()=>{
        setToggle(tog);
        setStatus(tog)
    },[tog])

    const handleToggle = (event, value) => {
        setToggle(value);
        setStatus(value)
    };

    return (
        <ToggleButtonGroup
            sx={{marginLeft: "50px"}}
            value={toggle}
            exclusive
            onChange={handleToggle}
            aria-label="text alignment"
            size='small'
        >
            <ToggleButton value="true" aria-label="left aligned">
                YES
            </ToggleButton>
            <ToggleButton value="false" aria-label="centered">
                NO
            </ToggleButton>
        </ToggleButtonGroup>
    );
}