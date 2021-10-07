import React from "react";
import { shape, arrayOf, string, func } from "prop-types";
import { makeStyles } from "@material-ui/core";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Box,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((/* theme */) => ({
  tableHeading: {
    fontWeight: "bold",
  },
  title: {
    margin: 0,
  },
  wrapper: {
    marginBottom: "15px",
  },
}));

const DiatonicTable = ({ scaleData, onRemove }) => {
  const classes = useStyles();

  return (
    <article className={classes.wrapper}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        padding="0.5rem 0"
        alignItems="flex-end"
      >
        <h3
          className={classes.title}
        >{`${scaleData.rootNote} ${scaleData.scale}`}</h3>
        <Button color="secondary" onClick={onRemove}>
          X
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {scaleData.chordQualites.map((cq, i) => (
                <TableCell
                  align="center"
                  key={`${cq}-${i}`}
                  className={classes.tableHeading}
                >
                  {cq}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {scaleData.notes.map((n, i) => (
                <TableCell align="center" key={`${n} ${i}`}>
                  {n}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </article>
  );
};

DiatonicTable.propTypes = {
  scaleData: shape({
    notes: arrayOf(string),
    rootNote: string,
    scale: string,
    chordQualites: arrayOf(string),
  }),
  onRemove: func.isRequired,
};

export default DiatonicTable;
