import React from "react"

export default function Card(props) {
    return (
        <div className="card">
            <div className="stack">
                <div>
                    <h2>{props.title}</h2>
                </div>
                {props.children}
            </div>
        </div>
    )
}