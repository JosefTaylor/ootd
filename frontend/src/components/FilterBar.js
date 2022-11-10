import React, { Component } from "react";

function FilterBar(props) {
    return (
        <input
            value={props.value}
            onChange={props.onChange}
            />
        )
}

export default FilterBar