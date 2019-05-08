import React from "react";

const EditEvent = ({ event, save }) => {
  const id = event.id;
  const keys = Object.keys(event).filter(key => key !== "id");

  const saveFn = () => {
    const eventData = {};
    const inputFields = document.getElementsByClassName("input-edit-field");
    for (let i = 0; i < inputFields.length; i++) {
      eventData[inputFields[i].value] = inputFields[++i].value;
    }
    save(eventData, id);
  };

  return (
    <div className="background">
      <div className="edit-event-container">
        {keys.map(prop => (
          <div className="edit-fields-container">
            <div className="edit-fields">
              <input
                className="input-edit-field key-edit-field"
                type="text"
                defaultValue={prop}
              />{" "}
              :{" "}
              <input
                className="input-edit-field value-edit-field"
                type="text"
                defaultValue={event[prop]}
              />
            </div>
          </div>
        ))}
        <div className="event-buttons">
          <button type="button" onClick={saveFn}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
