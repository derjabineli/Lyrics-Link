import React, { useEffect, useState, useContext } from "react";
import Event from "./Event";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../context/UserContext";

function Events() {
  const [events, setEvents] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const { userContext, setUserContext } = useContext(UserContext);

  useEffect(() => {
    // fetch(process.env.REACT_APP_APIURL + "/api/events", {
    //   credentials: "include",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setEvents((oldArray) => [...data]);
    //   });

    const getEvent = async () => {
      console.log(userContext);

      try {
        const token = await getAccessTokenSilently({
          scope: "read:users read:current_user read:user_idp_tokens",
        });
        const response = await fetch(
          process.env.REACT_APP_APIURL + "/api/events",
          {
            headers: {
              authorization: `Bearer ${token}`,
              user: userContext.id,
            },
          }
        );
        const eventData = await response.json();
        setEvents((oldArray) => [...eventData]);
      } catch (error) {
        console.log(error.message);
      }
    };

    getEvent();
  }, []);
  return (
    <>
      <div className="container">
        <div className="events_header">
          <h1>Events</h1>
          <a href="/new">
            <button className="ctaBtn events_button">Add New Event</button>
          </a>
        </div>
        <div className="events">
          {events.map((service) => (
            <a href={`event/${service.id}/update`} className="events_link">
              <Event
                key={service.id}
                id={service.id}
                name={service.event_type}
                date={service.event_date.substring(0, 10)}
                songCount={service.songs.length}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;
