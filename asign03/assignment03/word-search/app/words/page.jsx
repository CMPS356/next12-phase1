"use client"
import { useState, useTransition } from 'react';
import { useQuery } from "@tanstack/react-query";
import Box from '@mui/material/Box';
import {
  GridColumnMenu,
  GridColumnMenuContainer,
  GridFilterMenuItem,
  SortGridMenuItems,
  useGridApiRef,
  DataGrid,
} from '@mui/x-data-grid';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

export default function Words() {
  const [word, setWord] = useState('');
  const [results, setResults] = useState([]);
  const apiRef = useGridApiRef();


  async function fetcher(value) {
    const url = `https://api.datamuse.com/words?ml=${value}`;
    const response = await fetch(url);
    if (!response.ok) {
      return <Alert severity="error">Failed</Alert>;
    }
    const results = await response.json
    return results;

  }

  const query = useQuery(["facts", word], fetcher(), {
    retry: false,
    suspense: true,
  })

  const handleChange = (e) => {
    const value = e.target.value;
    setWord(value);
    startTransition(() => {
      setResults(query.data);
    });
  };

  return (
    <>
      <input value={word} onChange={handleChange} />
      <Box sx={{ height: 250, mt: 1 }}>
        <DataGrid
          apiRef={apiRef}
          columns={[
            { field: 'default', width: 150 },
            { field: 'name', width: 150 },
            { field: 'stars', width: 150 },
          ]}
          rows={[
            {
              id: 1,
              name: 'MUI',
              stars: 28000,
              default: 'Open source',
            },
            {
              id: 2,
              name: 'DataGridPro',
              stars: 15000,
              default: 'Enterprise',
            },
          ]}
          components={{
            ColumnMenu: CustomColumnMenuComponent,
          }}
          // componentsProps={{
          //   columnMenu: { color },
          // }}
        />
      </Box>

    </>
  )
}

const StyledGridColumnMenuContainer = styled(GridColumnMenuContainer)(
  ({ theme, ownerState }) => ({
    background: theme.palette[ownerState.color].main,
    color: theme.palette[ownerState.color].contrastText,
  }),
);

const StyledGridColumnMenu = styled(GridColumnMenu)(({ theme, ownerState }) => ({
  background: theme.palette[ownerState.color].main,
  color: theme.palette[ownerState.color].contrastText,
}));

function CustomColumnMenuComponent(props) {
  const { hideMenu, currentColumn, color, ...other } = props;

  if (currentColumn.field === 'name') {
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
        <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
      </StyledGridColumnMenuContainer>
    );
  }
  if (currentColumn.field === 'stars') {
    return (
      <StyledGridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        ownerState={{ color }}
        {...other}
      >
        <Box
          sx={{
            width: 127,
            height: 160,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <StarOutlineIcon sx={{ fontSize: 80 }} />
        </Box>
      </StyledGridColumnMenuContainer>
    );
  }
  return (
    <StyledGridColumnMenu
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      ownerState={{ color }}
      {...other}
    />
  );
}

CustomColumnMenuComponent.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  currentColumn: PropTypes.object.isRequired,
  hideMenu: PropTypes.func.isRequired,
};

export { CustomColumnMenuComponent };