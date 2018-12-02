import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import {react-apiButton} from "../button/Button";

export default class Stallen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            result: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/hello", {
            mode: "cors",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Result: ", result);
                    this.setState({
                        isLoaded: true,
                        items: result
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

    getResults() {
        fetch("http://localhost:5000/result", {
            mode: "cors",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("Result: ", result);
                    this.setState({
                        isLoaded: true,
                        result: result
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

    render() {
        const { error, isLoaded, items } = this.state;
        console.log("Items: ", items);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <CircularProgress color="secondary" />;
        } else {
            return (
                <div>
                    {this.state.items}
                    <button onClick={this.getResults}>
                        Get results
                    </button>
                </div>
            );
        }
    }
}