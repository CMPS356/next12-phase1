'use client';
import { useQuery } from 'react-query'
import { useSearchParams } from 'next/navigation';
import { useStore } from '../../stores/store';

import { useTransition } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { CircularProgress } from '@mui/material';

async function fetchWords(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
}


export default function TableComponent({query}) {
    const selection = useStore(state => state.selection)
    const handleClick = useStore(state => state.handleClick)

    const { isLoading, data } = useQuery(['words', query], () => fetchWords(`https://api.datamuse.com/words?ml=${query}`))

    if (isLoading) return <CircularProgress sx={{ marginTop: "100px", marginX: "10px"}} size="100px" />

    return (<>
        <h4 style={{color: "black", backgroundColor: "#FFCCCC", padding:"20px 10px 20px 30px", borderRadius:"8px",  display: data?.length == 0 && query!="" ? 'block' : 'none' }}> N O &nbsp; M A T C H I N G &nbsp; W O R D S</h4>
        <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
            <Table sx={{ minWidth: 650, display: data?.length == 0 && query!="" && 'none'  }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell ><h3>word</h3></TableCell>
                        <TableCell ><h3>score</h3></TableCell>
                        <TableCell align='center'><h3>tags</h3></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row) => (
                        <TableRow
                            key={row.word}
                            onClick={() => handleClick(row.word)}
                            hover='true'
                            selected={selection.find(w => w == row.word) && 'true'}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.word}
                            </TableCell>
                            <TableCell >{row.score}</TableCell>
                            <TableCell align='center'>{row.tags?.map(t => <Chip label={t} variant="outlined" sx={{ marginLeft: "5px" }}/>)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}


    // const searchParams = useSearchParams()
    // const query = searchParams.get('query');