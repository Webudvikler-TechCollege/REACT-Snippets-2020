import React, { useState } from "react";
import Styles from "./LineUp.module.scss";
import useFetch from "use-http";
import { useCallback } from "react";

export default function LineUp(props) {
  const [eventData, setEventData] = useState(false);

  return (
    <section>
      <div>
        <StageList eventData={eventData} setEventData={setEventData} />
      </div>
      <div className={Styles.events}>
        <EventList data={eventData} />
      </div>
    </section>
  );
}

const StageList = (props) => {
  const { setEventData } = props;
  const { data } = useFetch("/mediesuset/", []);

  const fetchStageData = useCallback(
    (id) => {
      const stage = data.stages.items.find(function (item) {
        if (item.id === id) {
          return item;
        } else {
          return null;
        }
      });
      const eventList = stage?.events?.items;
      if(eventList) {
        setEventData(eventList);
      }
    },
    [data, setEventData]
  );

  return (
    <div>
      {data &&
        data?.stages?.items?.map(({ name, id }) => {
          return (
            <button key={id} onClick={(e) => fetchStageData(id)}>
              {name}
            </button>
          );
        })}
    </div>
  );
};

const EventList = (props) => {
  const { data } = props;
  return (
    <>
      {data &&
        data?.map(({ title, image, localtime, id }) => {
          return (
            <div key={id}>
              <h4>{title}</h4>
              <h5>{localtime}</h5>
              <img style={{maxWidth:"20vw"}} src={image} alt={title}/>
            </div>
          );
        })}
    </>
  );
};
