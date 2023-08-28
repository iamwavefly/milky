import * as React from "react";
import Box from "@mui/material/Box";
import MuiStepper from "@mui/material/Stepper";
// import { makeStyles } from "@mui/styles";
import {
  Step,
  StepLabel,
  StepIcon,
  IconButton,
  StepIconProps,
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CheckIcon from "@/public/icons/check.svg";
import Styles from "./stepper.module.scss";

interface StepperProps {
  activeStep: number;
  alternativeLabel?: boolean;
  steps: {
    id: number;
    name: string;
  }[];
}

const CustomStepIcon = ({ active, completed, icon }: StepIconProps) => {
  if (active) {
    return (
      <IconButton className={Styles.activeStepIcon}>
        <Typography
          color="#0048B1"
          fontWeight={600}
          fontSize="13px"
          lineHeight="21px"
        >
          {icon}
        </Typography>
      </IconButton>
    );
  }

  if (completed) {
    return (
      <IconButton className={Styles.completedStepIcon}>
        <CheckIcon width={"14px"} height={"14px"} fill="#fff" />
      </IconButton>
    );
  }

  return (
    <IconButton className={Styles.currentStepIcon}>
      <Typography
        color="#070F1C"
        fontWeight={400}
        fontSize="13px"
        lineHeight="21px"
      >
        {icon}
      </Typography>
    </IconButton>
  );
};

export default function Stepper({
  activeStep,
  steps,
  alternativeLabel,
}: StepperProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <MuiStepper activeStep={activeStep} alternativeLabel={alternativeLabel}>
        {steps.map(({ id, name }) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={id} {...stepProps}>
              <StepLabel StepIconComponent={CustomStepIcon} {...labelProps}>
                {name}
              </StepLabel>
            </Step>
          );
        })}
      </MuiStepper>
    </Box>
  );
}
