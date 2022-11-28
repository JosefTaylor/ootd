import "./Stack.css"

export function Stack({children}) {
    return (
        <div className="flex-container">
            {children}
        </div>
    );
}

export function StackItem({children}) {
    return (
        <div className="flex-item">{children}</div>
        );
}