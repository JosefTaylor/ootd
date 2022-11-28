import "./Splitter.css"

export function Splitter({children}) {
    return (
        <div className="splitter-container">
            {children}
        </div>
    );
}

export function SplitterItem({children}) {
    return (
        <div>{children}</div>
        );
}