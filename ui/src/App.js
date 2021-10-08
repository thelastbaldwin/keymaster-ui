import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  AppBar,
  Typography,
  Grid,
  Container,
  Checkbox,
  Button,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

import { notes, scales } from "./const/const";
import {getChords} from './api/getChords';
import DiatonicTable from "./components/DiatonicTable";

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    marginTop: theme.spacing(2),
  },
  select: {
    width: "100%",
  },
  tableHeading: {
    fontWeight: "bold",
  },
}));

function App() {
  const classes = useStyles();

  const [rootNote, setRootNote] = useState("");
  const [scale, setScale] = useState("");
  const [use7thChords, setUse7thChords] = useState(true);

  const [keyData, setKeyData] = useState([]);

  const handleRemove = (index) => {
    const copy = keyData.slice();
    copy.splice(index, 1);
    setKeyData(copy);
  };

  return (
    <Grid container direction="row">
      <AppBar position="static">
        <Container maxWidth="lg">
          <Typography variant="h6">Keymaster</Typography>
        </Container>
      </AppBar>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <InputLabel id="rootNote" className={classes.inputLabel}>
              Root Note
            </InputLabel>
            <Select
              labelId="rootNote"
              id="rootNote"
              className={classes.select}
              onChange={(e) => setRootNote(e.target.value)}
              value={rootNote}
            >
              {notes.flat().map((n) => (
                <MenuItem value={n} key={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={4}>
            <InputLabel id="scale" className={classes.inputLabel}>
              Scale
            </InputLabel>
            <Select
              labelId="scale"
              id="scale"
              className={classes.select}
              onChange={(e) => setScale(e.target.value)}
              value={scale}
            >
              {Object.values(scales).map((s) => (
                <MenuItem value={s} key={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={2}>
            <InputLabel id="use7" className={classes.inputLabel}>
              7th Chords
            </InputLabel>
            <Checkbox
              color="primary"
              checked={use7thChords}
              onChange={(e) => setUse7thChords(e.target.checked)}
            />
          </Grid>
          <Grid container item xs={2} justify="center" alignItems="center">
            <Button
              color="primary"
              variant="contained"
              onClick={async () => {
                if (rootNote && scale) {
                  const chords = await getChords({ rootNote, scale, use7thChords });
                  if (chords){
                    setKeyData([...keyData, chords]);
                    setRootNote(null);
                    setScale(null);

                  }
                }
              }}
            >
              Add to List
            </Button>
          </Grid>
        </Grid>

        {keyData.map((kd, i) => (
          <DiatonicTable
            key={`${kd.rootNote}-${kd.scale}-${i}`}
            scaleData={kd}
            onRemove={() => {
              handleRemove(i);
            }}
          />
        ))}
      </Container>
    </Grid>
  );
}

export default App;
