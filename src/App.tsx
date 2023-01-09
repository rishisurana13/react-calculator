import { Box, Button, Grid, Typography } from "@mui/material";
import {evaluate } from "mathjs";
import { useState } from "react";

const  App = () => {

  // Display value
  const [displayValue, setDisplayValue] = useState("0");

  // evaluation string to be used by math.js
  const [evaluationString, setEvaluationString] = useState("");

  // Define button list by columns of 4
  // We can avoid hardcoding buttons with this
  const buttons = [
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "*",
    "0",
    ".",
    "=",
    "/",
    "CLEAR",
  ];

  // Operands list to refer to when omitting certain actions
  const operands = ["+", "-", "/", "*", "CLEAR", "="];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.innerText;
    
    if (!operands.includes(buttonValue)) {

      // support multi-digit numbers
      // Case 1: if there is an existing number being displayed
      if (displayValue !== "0") {
        setDisplayValue(displayValue + buttonValue);
      } else {
        // Case 2: If there is no number being displayed
        setDisplayValue(buttonValue);
      }
    }

    // Evaluate equation string using math.js
    // input example = '2+4+5'
    if (buttonValue === "=") {
      const result = evaluate(evaluationString);
      console.log("result:" + result);
      setDisplayValue(result);
      return;
    }

    // Reset calculator
    if (buttonValue === "CLEAR") {
      setDisplayValue("0");
      setEvaluationString("");
      return;
    }

    // Add every button click to the evaluation string
    // if string state = 1, and button clicked = `+` then new 
    // state of string = `1+`
    if (buttonValue !== "CLEAR") {
      setEvaluationString(evaluationString + buttonValue);
    }

    // Check if last button clicked is an operand, if it is,
    // then set the display value to the currently clicked button so 
    // as to create a new multi-digit number
    const lastButtonClicked = evaluationString.charAt(evaluationString.length-1)
    
    if (operands.includes(lastButtonClicked)) {
      setDisplayValue(buttonValue)
    }
  };

  return (
    <div className="App">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid width={"20%"} minWidth={'300px'}>
        <Grid item xs={12}>
          <Typography variant="h4" align="right">
            {displayValue}
          </Typography>
        </Grid>
          <Grid container spacing={1}>
            {buttons.map((button) => (
              <Grid item xs={3} key={button}>
                <Button
                  variant="outlined"
                  fullWidth
                  value={button}
                  onClick={handleClick}
                >
                  {button}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
