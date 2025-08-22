import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  margin: theme.spacing(2),
  '& .MuiButton-root': {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    minWidth: 100,
    padding: theme.spacing(1, 2),
  },
}));

export default function ButtonGroupDemo() {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StyledButtonGroup variant="contained">
        <Button
          onClick={() => setCount(count + 1)}
          disabled={disabled}
        >
          CLICK: {count}
        </Button>
        <Button onClick={() => setCount(0)}>
          CLEAR
        </Button>
        <Button
          onClick={() => setDisabled(!disabled)}
        >
          {disabled ? 'ABLE' : 'DISABLE'}
        </Button>
      </StyledButtonGroup>
    </div>
  );
}
