export default function FilterCheckBox(props) {
    return (
        <div>
            <input
                type="checkbox"
                id={props.item.id}
                name={props.item.id}
                checked={props.show}
                onChange={props.onChange(props.item.id)} />
            <label htmlFor={props.item.id}>
                {props.item.name}
            </label>
        </div>
    )
}