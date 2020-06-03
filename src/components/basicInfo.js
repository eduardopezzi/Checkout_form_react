import React from "react";
import "./BasicInfo.css";
import ErrorMessage from "./ErrorMessage";
import Box from "@material-ui/core/Box";

function FormField({ children }) {
  return <div className="FormField">{children}</div>;
}

function FormFieldLabel({ children, type }) {
  let className = "FormField-Label";
  if (type === "radio") {
    className += " FormField-Label__Radio";
  }
  return <label className={className}>{children}</label>;
}

function FormFieldLabelText({ children, type }) {
  let className = "FormField-LabelText";
  if (type === "radio") {
    className += " FormField-LabelText__Radio";
  }
  return <span className={className}>{children}</span>;
}

function TextInputField({ placeholder, value, onChange, errorMessageLabel }) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasFocusedOnce, setHasFocusedOnce] = React.useState(false);

  const onFocus = () => {
    setIsFocused(true);
    setHasFocusedOnce(true);
  };

  const onBlur = () => setIsFocused(false);

  return (
    <div>
      <input
        className="FormField-Input FormField-Input__Text"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {hasFocusedOnce && !isFocused && !value && (
        <ErrorMessage label={errorMessageLabel} />
      )}
    </div>
  );
}

function useTextInputState() {
  const [value, setValue] = React.useState("");
  const onChange = (event) => setValue(event.target.value);
  return {
    value,
    onChange,
  };
}

export default function BasicInfo({ nextStep }) {
  const firstNameState = useTextInputState();
  const lastNameState = useTextInputState();
  const [diet, setDiet] = React.useState(null);
  const onChangeDiet = (event) => setDiet(event.target.value);

  return (
    <div>
      <h3>Basic Info</h3> <Box m={5} />
      <FormField>
        <FormFieldLabel>
          <FormFieldLabelText>
            <spam className="FormField-Heading">First Name</spam>
          </FormFieldLabelText>
          <TextInputField
            placeholder={"Enter your first name"}
            value={firstNameState.value}
            onChange={firstNameState.onChange}
            errorMessageLabel="First name required"
          />
        </FormFieldLabel>
      </FormField>
      <FormField>
        <FormFieldLabel>
          <FormFieldLabelText>
            <spam className="FormField-Heading">Last Name </spam>
          </FormFieldLabelText>
          <TextInputField
            placeholder="Enter your last name"
            value={lastNameState.value}
            onChange={lastNameState.onChange}
            errorMessageLabel="Last name required"
          />
        </FormFieldLabel>
      </FormField>
      <FormField>
        <FormFieldLabel>
          <FormFieldLabelText>
            <spam className="FormField-Heading">Diet Restriction</spam>
          </FormFieldLabelText>
          <select onChange={onChangeDiet} value={diet}>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="halal-kosher">Halal/Kosher</option>
            <option value="none" selected>
              None
            </option>
          </select>
        </FormFieldLabel>
      </FormField>
      <div className="FormSubmit">
        <button
          className="FormSubmit-Button"
          onClick={() =>
            nextStep({
              firstName: firstNameState.value,
              lastName: lastNameState.value,
              diet: diet,
            })
          }
          disabled={!firstNameState.value || !lastNameState.value}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
