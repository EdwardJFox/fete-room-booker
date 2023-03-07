import { Preference } from "@prisma/client";
import { useState } from "react";

import SaveButton from "../Button/SaveButton";
import Radio from "../form/Radio";
import TextArea from "../form/TextArea";
import InfoMessage from "../InfoMessage";

type UserPreferencesFormProps = {
  preferences: Preference | null;
}

const UserPreferencesForm = ({ preferences }: UserPreferencesFormProps) => {
  const [userPreferences, setUserPreferences] = useState<any>(preferences || {
    typeOfRoom: "QUIET",
    dietary: "NONE",
    comments: ""
  });
  const [formSaved, setFormSaved] = useState(false);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    const newUserPreferences = { ...userPreferences };
    newUserPreferences[field] = value;
    setUserPreferences(newUserPreferences);
  }

  const savePreferences = () => {
    setFormError(false);
    setFormSaved(false);
    setFormSaving(true);
    fetch("/api/preferences/update", {
      method: "PATCH",
      body: JSON.stringify({
        userPreferences
      })
    }).then(() => {
      setFormSaved(true);
    }).catch(() => {
      setFormError(true);
    }).finally(() => {
      setFormSaving(false);
    });
  }

  return (
    <div className="my-4 px-6 py-5 bg-secondary-600 rounded-md">
      <h2 className="mb-2">Your Preferences</h2>
      <div className="mb-3">
        <p className="text-sm">Room Type</p>
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
      </div>
      <div className="mb-3">
        <p className="text-sm">Dietary Requirements</p>
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
      </div>
      <TextArea
        className="mb-4"
        label="Other comments"
        name="comments"
        value={userPreferences['comments']}
        onChange={handleInputChange} />
      <div className="flex items-center">
        <SaveButton
          saved={formSaved}
          saving={formSaving}
          errored={formError}
          onClick={savePreferences}
          className="flex items-center">
          Save Preferences
        </SaveButton>
        { formSaved && <p className="ml-2">Saved!</p>}
      </div>
      { formError && <InfoMessage style="danger" className="mt-2">An error occurred, please try again later</InfoMessage>}
    </div>
  )
}

export default UserPreferencesForm;
