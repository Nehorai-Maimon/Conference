import "./LoginScreenElements.css";

export function LoginScreenElements(props) {
    return (
        <div className="login-screens-general">
            {props.children}
        </div>
    )
}
export function LoginScreenHeader(props) {
    return (
        <div className="login-screens-header">
            {props.children}
        </div>
    )
}

export function LoginScreenAction(props) {
    return (
        <div className="login-screens-action">
            {props.children}
        </div>
    )
}
