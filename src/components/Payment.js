import React from "react";
import "./Forms";
import "./Payment.css";
import ErrorMessage from "./ErrorMessage";

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

function RadioInputField({ value, checked, onChange }) {
  return (
    <input
      className="FormField-Input FormField-Input__Radio"
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
    />
  );
}
// const [loading, setLoading] = React.useState(false)
// const handleSubmit = () => {
//   setLoading(true);
//   fetch('teste')
//   .then((response)=>{
//     setLoading(false);
//     //display reposne
//   })
// }

// {loading? <spinner> : null}

export default function Payment({ nextStep, previousStep }) {
  const [termsAgreed, setTermsAgreed] = React.useState("");
  const onChangeTerms = (event) => {
    setTermsAgreed(event.target.checked);
  };

  const [payment, setPayment] = React.useState("");
  const onChangePayment = (event) => {
    setPayment(event.target.value);
    console.log(event.target.value);
  };

  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="BasicInfo-Form">
      <h3>Payment Info</h3>

      <FormField style={""}>
        <spam className="FormField-Heading">Method Payment</spam>

        <div>
          <FormFieldLabel type="radio">
            <FormFieldLabelText type="radio">
              <RadioInputField
                value="Bitcoin"
                checked={payment === "Bitcoin"}
                onChange={onChangePayment}
              />
              Bitcoin
            </FormFieldLabelText>
          </FormFieldLabel>
        </div>
        <div>
          <FormFieldLabel type="radio">
            <FormFieldLabelText type="radio">
              <RadioInputField
                value="Paypal"
                checked={payment === "Paypal"}
                onChange={onChangePayment}
              />
              Paypal
            </FormFieldLabelText>
          </FormFieldLabel>
        </div>
        <div>
          <FormFieldLabel type="radio">
            <FormFieldLabelText type="radio">
              <RadioInputField
                value="Credit-Card"
                checked={payment === "Credit-Card"}
                onChange={onChangePayment}
              />
              Credit Card
            </FormFieldLabelText>
          </FormFieldLabel>
        </div>
      </FormField>

      <FormField>
        <FormFieldLabel>
          <FormFieldLabelText>
            <input
              className="FormField-Input FormField-Input__Checkbox"
              type="checkbox"
              checked={termsAgreed}
              onChange={onChangeTerms}
            />
            <span>I agree to the Terms & Conditions.</span>
          </FormFieldLabelText>
        </FormFieldLabel>
      </FormField>
      <div>
        {isOnline ? null : (
          <ErrorMessage label={"You are OffLine. Go OnLine to save the Data"} />
        )}
      </div>

      <div className="FormSubmit">
        <button
          className="FormSubmit-backButton"
          onClick={() => previousStep()}
        >
          Back
        </button>

        <button
          className="FormSubmit-Button"
          onClick={() =>
            nextStep({ payment: payment, termsAgreed: termsAgreed })
          }
          disabled={!termsAgreed || !payment || !isOnline}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
