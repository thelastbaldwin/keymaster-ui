const express = require('express');
const app = express()
const port = process.env.API_PORT;
const corsPort = process.env.UI_PORT;

const { getChords } = require("./keymaster");
const { urlSlugValidation } = require("./util/validation-util");
const { normilizeNotes, nomilizeScale, nomilazeUse7thChords } = require("./util/mung-params");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `http://localhost:${corsPort}`); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (_req, res) => {
  res.redirect('/api');
})

app.get('/api', (_req, res) => {
  res.status(400).send({ error: 'Nothing to see here!, you need a NOTE and a SCALE' });
})

app.get('/api/:rootNote', (req, res) => {
  const { rootNote } = req.params;
  const validation = urlSlugValidation({rootNote});

  if (validation === true) {
    res.send(JSON.stringify({ rootNote }));
  } else {
    res.status(400).send({ error: validation });
  }
});

app.get('/api/:rootNote/:scale', (req, res) => {
  const { rootNote, scale } = req.params;
  const { use7thChords = 'false' } = req.query;
  const validation = urlSlugValidation({rootNote, scale, use7thChords});

  if (validation === true) {
    const notes = normilizeNotes(rootNote);
    const scales = nomilizeScale(scale);
    const use7th = nomilazeUse7thChords(use7thChords);

    const response = getChords({
      rootNote: notes,
      scale: scales,
      use7thChords: use7th
    });

    res.send(response);
  } else {
    res.status(400).send({ error: validation });
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port} <== It's over 9000!`);
})
