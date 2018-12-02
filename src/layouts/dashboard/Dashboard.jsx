import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SimpleLineChart from "../../components/linechart/LineChart";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import GridLayout from "../grid/Grid";
import SimpleTable from "../../components/table/Table";
import Button from "@material-ui/core/Button/Button";
import Refresh from "@material-ui/icons/Refresh";
import Pause from "@material-ui/icons/Pause";
import Play from "@material-ui/icons/PlayArrow";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    button: {
        float: "right",
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    mainArea: {
        width: '100%',
        flexDirection: "col",
    },
    content: {
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'none',
        width: "auto"
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});

class Dashboard extends React.Component {
    state = {
        open: false,
    };

    componentDidMount() {
        this.getResults();
        this.getBestResults();
        this.setState({
            activeInterval: true
        }, this.startUpdateResults);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    stopUpdateResults() {
        this.setState({
            activeInterval: false
        })
    }

    startUpdateResults() {
        this.interval = this.state.activeInterval && setInterval(() => this.updateResults(), 5000);
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    getResults() {
        fetch("http://localhost:5000/result", {
            mode: "cors",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("DATA: ", result);
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    getBestResults() {
        fetch("http://localhost:5000/result/best", {
            mode: "cors",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        bestIsLoaded: true,
                        bestResults: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        bestIsLoaded: true,
                        error
                    });
                }
            )
    }

    updateResults() {
        fetch("http://localhost:5000/result/update", {
            mode: "cors",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const updatedData = this.state.data;
                    result && updatedData.map((d, i) => {
                        return d.push(result[i])
                    });
                    this.setState({
                        isLoaded: true,
                        data: updatedData
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    renderCharts(data) {
        const { classes } = this.props;
        return data.map((arr, i) => {
            return (
                <div key={"Array-" + i}>
                    <Typography variant="h4" gutterBottom component="h2">
                        {SimpleLineChart.Names[i]}
                        {this.state.activeInterval && (
                            <CircularProgress color={"primary"} className={classes.button}/>
                        )}
                    </Typography>
                    <Typography component="div" className={classes.chartContainer}>
                        <SimpleLineChart data={arr} domain={SimpleLineChart.Domains[i]}/>
                    </Typography>
                </div>
            );
        })
    }

    renderTables() {
        const { classes } = this.props;
        const { bestResults } = this.state;
        return bestResults && (
            <Typography component="div" className={classes.chartContainer} gutterBottom>
                <SimpleTable data={bestResults}/>
            </Typography>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                </Drawer>
                <GridLayout container={true} item={false}>
                    <div className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Typography variant="h3" gutterBottom component="h2">
                            Graphs
                            <Button variant="fab" color="secondary" aria-label="Edit" className={classes.button} onClick={this.updateResults}>
                                <Refresh/>
                            </Button>
                            <Button variant="fab" color="secondary" aria-label="Stop" className={classes.button} onClick={this.stopUpdateResults}>
                                <Pause/>
                            </Button>
                            <Button variant="fab" color="primary" aria-label="Play" className={classes.button} onClick={this.startUpdateResults}>
                                <Play/>
                            </Button>
                        </Typography>
                        {this.state.data ? this.renderCharts(this.state.data) : <CircularProgress color="secondary" />}
                    </div>
                    <div className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Typography variant="h3" gutterBottom component="h2">
                            Best Results
                            <Button variant="fab" color="secondary" aria-label="Edit" className={classes.button} onClick={this.getBestResults}>
                                <Refresh/>
                            </Button>
                        </Typography>
                        <div className={classes.tableContainer}>
                            {this.state.data ? this.renderTables(this.state.data) : <CircularProgress color="secondary" />}
                        </div>
                    </div>
                </GridLayout>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);