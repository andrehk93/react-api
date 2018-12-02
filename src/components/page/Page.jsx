import * as React from "react";
import classNames from "../../utils/ClassNames";
import GridLayout from "../../layouts/grid/Grid";


export default class Page extends React.Component {
    constructor(props) {
        super(props);
    }

    static ClassNames = {
        root: "react-api-page"
    };

    render() {
        const {children} = this.props;
        const classes = classNames([Page.ClassNames.root]);
        return (
            <GridLayout classes={classes} container={true} item={false} direction={"column"} alignItems={"center"}>
                {children}
            </GridLayout>
        )
    }
}