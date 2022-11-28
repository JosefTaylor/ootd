import "./Stack.css"

export function Stack({children}) {
    return (
        <div className="stack-container">
            {children}
        </div>
    );
}

export function StackItem({children}) {
    return (
        <div>{children}</div>
        );
}