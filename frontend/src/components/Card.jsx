import React from "react"

export default function Card(props) {
    return (
        <div className={[props.className, "card"].join(" ", )}>
            <div className="stack ht-full">
                <div>
                    <h2>{props.title}</h2>
                </div>
                {props.children}
            </div>
        </div>
    )
}