import "./Wrapper.css"

export function Wrapper({children}) {
    return (
        <div className="wrapper">
            {children}
        </div>
    );
}