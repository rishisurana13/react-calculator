import { Box, Button, Grid, Typography } from "@mui/material";
import {evaluate } from "mathjs";
import { useState } from "react";

function App() {
  const [displayValue, setDisplayValue] = useState("0");
  const [evaluationString, setEvaluationString] = useState("");

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
  const operands = ["+", "-", "/", "*", "CLEAR", "="];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.innerText;
    
    if (!operands.includes(buttonValue)) {
      // support multi-digit numbers
      if (displayValue !== "0") {
        setDisplayValue(displayValue + buttonValue);
      } else {
        setDisplayValue(buttonValue);
      }
    }

    if (buttonValue === "=") {
      const v = evaluate(evaluationString);
      console.log("result:" + v);
      setDisplayValue(v);
      return;
    }

    if (buttonValue === "CLEAR") {
      setDisplayValue("0");
      setEvaluationString("");
      return;
    }

    if (buttonValue !== "CLEAR") {
      setEvaluationString(evaluationString + buttonValue);

    }
    console.log(evaluationString);
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
