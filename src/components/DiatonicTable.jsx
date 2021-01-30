import React from "react";
import { shape, arrayOf, string } from "prop-types";
import { makeStyles } from "@material-ui/core";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";

const useStyles = makeStyles((/* theme */) => ({
  tableHeading: {
    fontWeight: "bold",
  },
}));

const DiatonicTable = ({ scaleData }) => {
  const classes = useStyles();

  return (
    <div>
      <h3>{`${scaleData.rootNote} ${scaleData.scale}`}</h3>
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
    </div>
  );
};

DiatonicTable.propTypes = {
  scaleData: shape({
    notes: arrayOf(string),
    rootNote: string,
    scale: string,
    chordQualites: arrayOf(string),
  }),
};

export default DiatonicTable;
