import { useState } from "react"
import { Link } from "react-router-dom"

function Index(props) {
    // state to hold formData
    const [newForm, setNewForm] = useState({
        name: "",
        img: "",
        title: "",
    })

    // handleChange function for form
    const handleChange = (event) => {
        if (!props.user) return;
        setNewForm((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    // handle submit function for form
    const handleSubmit = (event) => {
        if (!props.user) return;
        event.preventDefault()
        props.createPeople(newForm)
        setNewForm({
            name: "",
            img: "",
            title: "",
        })
    }

    // loaded function
    const loaded = () => {
        return props.people.map((person) => (
            <div key={person._id} className="person">
                <Link to={`/people/${person._id}`}>
                    <h1>{person.name}</h1>
                </Link>
                <img src={person.img.includes('.jpg' || '.jpeg' || '.png') ? person.img : "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.salonlfc.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fimage-not-found-1-scaled-1150x647.png&f=1&nofb=1"} alt={person.name} />
                <h3>{person.title}</h3>
            </div>
        ))
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newForm.name}
                    name="name"
                    placeholder="name"
                    required
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.img}
                    name="img"
                    placeholder="image URL"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.title}
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                />
                <input disabled={!props.user} type="submit" value="Create Person" />
            </form>
            {props.people.length > 0 ? loaded() : loading()}
        </section>
    )
}

export default Index