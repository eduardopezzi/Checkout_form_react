import React from "react";
import "./App.css";
import BasicInfo from "./components/basicInfo";
import AddressInfo from "./components/AddressInfo";
import Payment from "./components/Payment";
// import firebase from 'firebase'

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      // margin: theme.spacing(1),
      width: "300px",
      padding: theme.spacing(3),
    },
    "justify-content": "center",
    "margin-top": "20px",
  },
}));

function App() {
  const classes = useStyles();
  const [step, setStep] = React.useState(1);
  const basicInfoNextStep = ({ firstName, lastName, diet }) => {
    setStep(2);
    setFirebaseData({ ...firebaseData, firstName, lastName, diet });
  };

  const addressInfoNextStep = ({ city, province }) => {
    setStep(3);
    setFirebaseData({ ...firebaseData, city, province });
  };

  const paymentInfoNextStep = ({ termsAgreed, payment }) => {
    setFirebaseData({ ...firebaseData, payment, termsAgreed });
    CreateUser();
  };

  const backButton = () => {
    let stepback = step - 1;
    setStep(stepback);
    setFirebaseData({ firebaseData });
  };

  const [firebaseData, setFirebaseData] = React.useState({});

  React.useEffect(() => {
    CreateUser(firebaseData);
  }, [firebaseData]);

  let Content = <BasicInfo nextStep={basicInfoNextStep} />;

  switch (step) {
    case 1:
      Content = <BasicInfo nextStep={basicInfoNextStep} />;
      break;
    case 2:
      Content = (
        <AddressInfo nextStep={addressInfoNextStep} previousStep={backButton} />
      );
      break;
    case 3:
      Content = (
        <Payment nextStep={paymentInfoNextStep} previousStep={backButton} />
      );
      break;
    default:
      Content = null;
      break;
  }

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <div className="App-Title">Checkout Form</div>
        <div>{Content}</div>
      </Paper>
    </div>
  );
}

function CreateUser(firebaseData) {
  // const newUserRef = firebase.database().ref()
  // console.log(firebaseData)
  // newUserRef.push(firebaseData)
}

export default App;
