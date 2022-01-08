import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from '../pages/Index';
import Show from '../pages/Show';

function Main(props){
    console.log(props, 'are main props')
    const [people, setPeople] = useState(null);
    // const URL  = 'https://react-people-api.herokuapp.com/api/people';
    const URL  = 'http://localhost:4000/api/people';

    const getPeople = async () => {
        const response = await fetch(URL);
        const data = await response.json();
        setPeople(data);
    }

    const createPeople = async (person) => {
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        })
        getPeople();
    }

    const deletePerson = async (id) => {
        await fetch(URL + '/' + id, {
            method: 'DELETE'
        })
        getPeople();
    }

    useEffect(() => {
        getPeople();
    }, []);

    return(
        <main>
            <Switch>
                <Route exact path="/">
                    <Index people={people} createPeople={createPeople} />
                </Route>
                <Route path="/people/:id" render={(rp) => <Show {...rp} people={people} deletePerson={deletePerson} />} />
            </Switch>
        </main>

    )
}

export default Main;