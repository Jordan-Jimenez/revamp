import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import React, { ChangeEvent, useState } from "react";
import TextInput from "../../Components/ui/textInput";
import { LoginManager } from "../../Stores/Login";

const Login = () => {
  const [manager] = useState(new LoginManager());

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    manager.email.setvalue(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    manager.password.setvalue(e.target.value);
  };

  return (
    <Box>
      <Typography>Login</Typography>

      {/* <form onSubmit={handleSubmitForm}> */}
      <TextInput
        value={manager.email.value}
        handleValueChange={handleEmailChange}
        placeholder="Email Address"
        type="email"
      />

      <TextInput
        value={manager.password.value}
        handleValueChange={handlePasswordChange}
        placeholder="Password"
        type="password"
      />

      <Box width="100%" display="flex" justifyContent="center">
        <Button
          type="submit"
          style={{
            marginTop: "40px",
            backgroundColor: "#66C6B2",
            width: "205px",
            height: "40px",
            borderRadius: "25px",
            color: "#02172A",
          }}
        >
          Log In
        </Button>
      </Box>
      {/* </form> */}
    </Box>
  );
};

export default Login;
