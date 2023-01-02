import { useStore } from '../../stores/store';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Tags({ setWord, setTyped }) {
    const selection = useStore(state => state.selection)
    const handleDelete = useStore(state => state.handleDelete)

    return (
        <>
            <h4 style={{ color: "gray", paddingLeft: "5px", paddingTop: "30px", display: !selection.length && 'none'}}>S E L E C T I O N</h4>
            <Stack flexWrap={'wrap'} flexDirection="row" alignItems={'center'} sx={{ marginBottom: '40px', border: selection.length && '1px lightgray solid', padding: '10px',  borderRadius: "10px" }}>
                {/* <h1>{JSON.stringify(selection)}</h1> */}
                {selection.map(s =>
                    <Chip
                        label={s}
                        onClick={() => {setWord(s); setTyped(s)}}
                        onDelete={() => handleDelete(s)}
                        color="primary"
                        variant='outlined'
                        sx={{ height: '40px', marginLeft: "10px", marginY: '10px' }}
                    />)}
            </Stack>
        </>)
}