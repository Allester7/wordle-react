export default function Language(props){
    console.log(props);
    const style = {
        backgroundColor: props.language.backgroundColor,
        color : props.language.color
    }
    return (
        <h2 className="language-style" style={style}>{props.language.name}</h2>
        // <p>{props.language.name}</p>
    )
}