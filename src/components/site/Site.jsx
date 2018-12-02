import * as React from "react";
import classNames from "../../utils/ClassNames";
import GridLayout from "../../layouts/grid/Grid";


export default class Site extends React.Component {
    constructor(props) {
        super(props);
    }

    static ClassNames = {
        root: "react-api-site"
    };

    render() {
        const {children} = this.props;
        const classes = classNames([Site.ClassNames.root]);
        return (
            <GridLayout classes={classes} container={true} item={false}>
                {children}
            </GridLayout>
        )
    }
}