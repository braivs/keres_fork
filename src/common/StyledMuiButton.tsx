import React from 'react';
import styled from "styled-components";
import {Button} from "@mui/material";

const StyledButton = styled.div<{fullWidth?: boolean}>`
  width: ${p => (p.fullWidth ? '100%' : 'auto')};

  .MuiButton-root, .MuiButton-contained, .MuiButton-containedPrimary, .MuiButton-sizeMedium, .MuiButton-containedSizeMedium, .MuiButtonBase-root, .Common_button__LDobG, .css-sghohy-MuiButtonBase-root-MuiButton-root {
    background: #484a4d;
    color: white;
    text-transform: none;
    font-family: Droidiga;
    height: 50px;

    &:hover {
      background: #19191a;
      color: white;
    }
  }
`

export const StyledMuiButton:React.FC<PropsType> = (props) => {
    return (
        <StyledButton fullWidth={props.fullWidth}>
            <Button variant="contained" className={props.className} fullWidth={props.fullWidth} onClick={props.onClick}>
                {props.children}
            </Button>
        </StyledButton>
    )
}

type PropsType = {
    className?: string
    fullWidth?: boolean
    onClick?: () => void
}