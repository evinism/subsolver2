import "./Create.css";
import { useState, KeyboardEvent } from "react";
import {Alert, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import PageHeader from "../layout/PageHeader";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { generatePath } from "react-router-dom";
import { Plaintext } from "../plaintexts";
import { encodeBase64 } from "../util";

const minLength = 20;

const Create = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [origin, setOrigin] = useState("");
  const [mode, setMode] = useState("casual");

  const isTooShort = text.trim().length < minLength;

  const copyLink = () => {
    const plaintext: Plaintext = {
      id: "",
      text,
      author,
      origin,
    };
    const encodedPlaintext = encodeBase64(JSON.stringify(plaintext));
    const link = window.location.origin + generatePath("/:mode/custom#:data", {mode, data: encodedPlaintext});

    navigator.clipboard.writeText(link);
  };

  const stopPropagation = (event: KeyboardEvent) => {
    // Stop keyboard events of this page from getting processed by KeysPressed,
    // and let the user type text with spaces freely.
    event.stopPropagation();
  };

  return (
    <div
      className="create-page"
      onKeyDown={stopPropagation}
      onKeyUp={stopPropagation}
    >
      <PageHeader headerText={"Create new puzzle"}/>

      <article className="main-content">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              value={text}
              onChange={(event) => setText(event.target.value)}
              label={"Text"}
              placeholder={"Enter the puzzle phrase to be solved"}
              fullWidth={true}
              multiline={true}
              minRows={5}
              autoFocus={true}
            />

            {isTooShort && <Alert severity={"info"}>
                Please type at least {minLength} letters to create a puzzle
            </Alert>}
          </Grid>

          <Grid item xs={6} sm={3}>
            <FormControl fullWidth={true}>
              <InputLabel id={"mode-label"}>Mode</InputLabel>
              <Select
                label={"Mode"}
                labelId={"mode-label"}
                value={mode}
                onChange={(event) => setMode(event.target.value)}
              >
                <MenuItem value={"classic"}>Classic</MenuItem>
                <MenuItem value={"casual"}>Casual</MenuItem>
                <MenuItem value={"hard"}>Hardcore</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={3}>
            <TextField
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              label={"Author"}
              fullWidth={true}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
              label={"Origin"}
              fullWidth={true}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={copyLink}
              disabled={isTooShort}
              size="large"
              variant="contained"
              color="primary"
              endIcon={<ContentCopyIcon/>}
            >
              Share the link
            </Button>
          </Grid>
        </Grid>
      </article>
    </div>
  );
};

export default Create;
