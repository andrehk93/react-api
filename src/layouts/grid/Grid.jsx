import React from 'react';
import classNames from "../../utils/ClassNames";
import Grid from "@material-ui/core/Grid/Grid";
import * as PropTypes from "prop-types";


class GridLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    static ClassNames = {
        root: "react-api-grid",
        composition: comp => "react-api-grid--composition-" + comp,
    };

    render() {
        const {composition, children, alignContent, alignItems, classes, rootComponent, direction, justify, lg, md, sm, item, container, key} = this.props;
        const allClasses = classNames([GridLayout.ClassNames.root, GridLayout.ClassNames.composition(composition), classes]);
        return (
            <Grid key={key} {...this.props} className={allClasses} item={item} container={container} direction={direction} justify={justify} alignContent={alignContent} alignItems={alignItems}>
                {children}
            </Grid>
        );
    }
}

GridLayout.propTypes = {
    container: PropTypes.bool.isRequired,
    item: PropTypes.bool.isRequired,
    direction: PropTypes.string,
};

export default GridLayout;