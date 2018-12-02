import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from "@material-ui/core/TableCell/TableCell";
import SimpleLineChart from "../linechart/LineChart";

const styles = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
};

function SimpleTable(props) {
    const { classes, data } = props;
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Stat type
                        </TableCell>
                        <TableCell>
                            Result
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((cell, i) => {
                        return (
                            <TableRow key={SimpleLineChart.Names[i]}>
                                <TableCell>
                                    {SimpleLineChart.Names[i]}
                                </TableCell>
                                <TableCell>
                                    {cell}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);