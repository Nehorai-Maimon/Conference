import "./Advertising.css";
import { useEffect, useState } from "react";
import rootStores from "../../Stores/Main";
import { observer } from "mobx-react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "react-router-dom";

const advertisingStore = rootStores.ADVERTISING_STORE;

const Advertising = () => {
  const { getAllAdvertising, advertisement } = advertisingStore;

  useEffect(() => {
    const fetchData = async () => {
      await getAllAdvertising();
    };
    fetchData();
  }, [getAllAdvertising]);
  useEffect(() => {}, [advertisement]);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = advertisement.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: "100vw", flexGrow: 1 }}>
      <div style={{ backgroundColor: "green" }}>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: "5.1875rem",
            pl: 2,
            top: "6.75rem",
            gap: "1.25rem",
            bgcolor: "background.default",
          }}
        ></Paper>
      </div>

      <div
        className="advertising-container"
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {advertisement.map((step, index) => (
          <div key={step.index}>
            {Math.abs(activeStep - index) <= 0 ? (
              <Link to={step.link} target="_blank">
                <div
                  className="contain-advertising"
                  style={{
                    backgroundImage: `url(${step.imageUrl})`,
                  }}
                  onClick={() => console.log(step.link)}
                >
                  <div className="container-details">
                    <div className="name-of-advertising">{step.name}</div>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        ))}{" "}
      </div>
      <div className="back-and-next">
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <div className="next-button">
              <button
                className="arrow-buttons"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </button>
            </div>
          }
          backButton={
            <div className="back-button">
              <button
                className="arrow-buttons"
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </button>
            </div>
          }
        />
      </div>
    </Box>
  );
};

const advertisingsObserver = observer(Advertising);
export default advertisingsObserver;
