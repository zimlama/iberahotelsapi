import { useEffect, useState } from "react";
import CardActivities from "../CardActivities/CardActivities.js";
import axios from "axios";
const { REACT_APP_GET_ALL_SERVICES } = process.env;

function LocalExperiences() {

    const [activities, setActivities] = useState([]);

    useEffect(() => {

        axios.get(REACT_APP_GET_ALL_SERVICES)
            .then((res) => {
                console.log(res)
                setActivities(res.data)
            })
            .catch((err) => console.log(err))

    }, []);

    console.log(activities);

    if (activities.length > 1) {

        return (
            <div>
                {activities.length > 1 && activities.map((activitie) => {
                    return (
                        <CardActivities
                            name={activitie.name}
                            description={activitie.description}
                            image={activitie.image}
                            price={activitie.price}
                        />
                    );
                })}
            </div>
        );

    } else {

        return (

            <div>Loading...</div>

        )

    };

};


export default LocalExperiences;
