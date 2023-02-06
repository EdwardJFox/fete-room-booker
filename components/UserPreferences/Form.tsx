import { useState } from "react";
import Button from "../Button";
import Radio from "../form/Radio";

const UserPreferencesForm = ({ preferences }) => {
  const [userPreferences, setUserPreferences] = useState<any>(preferences || {
    typeOfRoom: "QUIET",
    dietary: "NONE",
  });

  const handleInputChange = (field: string, value: string) => {
    const newUserPreferences = { ...userPreferences };
    newUserPreferences[field] = value;
    setUserPreferences(newUserPreferences);
  }

  const savePreferences = () => {
    fetch("/api/preferences/update", {
      method: "PATCH",
      body: JSON.stringify({
        userPreferences
      })
    })
  }

  return (
    <div className="my-4 p-6 bg-secondary-600 rounded-md">
      <h2>Preferences</h2>
      <p><b>Room Type</b></p>
      <Radio
        label="Quiet"
        name="typeOfRoom"
        value="QUIET"
        checked={userPreferences["typeOfRoom"] === "QUIET"}
        onChange={handleInputChange} />
      <Radio
        label="Party"
        name="typeOfRoom"
        value="PARTY"
        checked={userPreferences["typeOfRoom"] === "PARTY"}
        onChange={handleInputChange} />
      <br />
      <p><b>Dietary Requirements</b></p>
      <Radio
        label="None"
        name="dietary"
        value="NONE"
        checked={userPreferences["dietary"] === "NONE"}
        onChange={handleInputChange} />
      <Radio
        label="Vegetarian"
        name="dietary"
        value="VEGETARIAN"
        checked={userPreferences["dietary"] === "VEGETARIAN"}
        onChange={handleInputChange} />
      <Radio
        label="Vegan"
        name="dietary"
        value="VEGAN"
        checked={userPreferences["dietary"] === "VEGAN"}
        onChange={handleInputChange} />
      <br />
      <Button onClick={savePreferences}>Save Preferences</Button>
    </div>
  )
}

export default UserPreferencesForm;
