import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField/TextField";
import React, { ChangeEvent, FC } from "react";

interface TextInputProps {
  value?: string;
  handleValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
}

const TextInput: FC<TextInputProps> = ({
  value,
  handleValueChange,
  placeholder,
  type,
}) => {
  const classes = useStyles();

  return (
    <TextField
      value={value}
      onChange={handleValueChange}
      placeholder={placeholder}
      type={type}
      InputProps={{ className: classes.underline }}
      inputProps={{
        min: 0,
        style: { textAlign: "center", padding: "10px 0px 7px" },
      }}
      className={classes.textfield}
    />
  );
};

const useStyles = makeStyles({
  underline: {
    "&&:before": {
      width: "0%",
    },
    "&&:after": {
      width: "100%",
    },
  },
  textfield: {
    width: "500px",
    height: "40px",
    background: "#dbdbdb26",
    borderRadius: "25px",
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
});

export default TextInput;
