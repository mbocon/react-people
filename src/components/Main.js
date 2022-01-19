import { useEffect, useState } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"

function Main(props) {
    const [people, setPeople] = useState([]);


    //   const URL  = 'https://react-people-api.herokuapp.com/api/people/';
    const URL = 'http://localhost:4000/api/people/'

    const createPeople = async (person) => {
        if (!props.user) return;
        const token = await props.user.getIdToken();
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(person),
        });
        const people = await response.json()
        setPeople(people)
    }

    const updatePeople = async (person) => {
        if (!props.user) return;
        const token = await props.user.getIdToken();
       const response = await fetch(URL + person._id, {
            method: "PUT",
            headers: {
                "Content-Type": "Application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(person),
        })
        const people = await response.json()
        setPeople(people);
    }

    const deletePeople = async (id) => {
        if (!props.user) return;
        const token = await props.user.getIdToken();
       const response = await fetch(URL + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            },
        })
        const people = await response.json();
        setPeople(people);
    }

    const handleLogout  = () =>  {
        setPeople([])
    }

    useEffect(() => {
        const getPeople = async () => {
            if(!props.user) return;
            const token  = await props.user.getIdToken();
            const response = await fetch(URL, {
                method: 'GET',
                headers:  {
                    "Authorization": "Bearer " + token
                }
            })
            const data = await response.json()
            setPeople(data)
        };

        if(props.user) {
            getPeople()
        } else {
            handleLogout()
        };
    }, [props.user])

    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Index user={props.user} people={people} createPeople={createPeople} />
                </Route>
                <Route
                    path="/people/:id"
                    render={(rp) => (
                        props.user ?
                            <Show
                                people={people}
                                updatePeople={updatePeople}
                                deletePeople={deletePeople}
                                {...rp}
                            />
                            : <Redirect to="/" />
                    )}
                />
            </Switch>
        </main>
    )
}

export default Main