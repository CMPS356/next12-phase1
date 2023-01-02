import { Tabs, Tab } from "@mui/material";
import { useQuery } from 'react-query'
import { Box } from '@mui/material';


async function fetchWords(url) {
    const res = await fetch(url)
    const data = await res.json()
    return data
}

export default function Suggestions({ word, setWord, setTyped}) {
    const { isLoading, data } = useQuery(['suggestions', word], () => fetchWords(`https://api.datamuse.com/sug?s=${word}`))

    if (isLoading) return <h5 style={{marginTop: "70px", marginLeft:"30px"}}>...Loading</h5>

    return (
        <Box sx={{bgcolor: 'background.paper' ,marginTop: "48px"}} minWidth="40px">
            <Tabs
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                aria-label="scrollable force tabs example"
                sx={{ height: "50px"}}
            >
                {data.map(s => <Tab onClick={() => {setWord(s.word); setTyped(s.word)}} label={s.word} style={{ marginTop: '2px'}} />)}
            </Tabs>
        </Box>
    );


}

// const { isLoading, data } = useQuery(['suggestions', word], () => fetchWords(`https://api.datamuse.com/sug?s=${word}`))

// if (isLoading) return <h5 style={{marginTop: "70px", marginLeft:"10px"}}>...Loading</h5>

// return <>
// {data.map((s,i) => {
//   if (i>6) return;
//  return <Chip  onClick={() => setWord(s.word)} label={s.word} style={{ marginTop: '60px', marginLeft: "20px"}} />
// })
// }
// </>