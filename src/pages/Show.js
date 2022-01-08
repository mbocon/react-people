import { Link } from 'react-router-dom';

function Show(props) {
    console.log(props, 'are show props')
    const person = props.people.find(p => p._id === props.match.params.id);

    return (
        <div className="show">
            <h1>{person.name}</h1>
            <h3>{person.title}</h3>
            <img src={person.img} alt={person.name} />
            <br />
            <Link to="/" >
                <button onClick={() => props.deletePerson(person._id)}>X</button>
            </Link>
        </div>
    )
}

export default Show;