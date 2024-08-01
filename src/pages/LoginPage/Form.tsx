import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik, FormikErrors, FormikTouched } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { baseUrl } from "../../utils/constants";
import { setLogin } from "../../state";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialRegisterValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialLoginValue = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  type RegisterTouched = FormikTouched<typeof initialRegisterValue>;
  type RegisterErrors = FormikErrors<typeof initialRegisterValue>;
  type RegisterFromValue = typeof initialRegisterValue;

  console.log("pageType", pageType, isRegister);

  const handleFormSubmit = async (values: any, onSubmitProps: any) => {
    console.log(isLogin, isRegister);

    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const register = async (values: any, onSubmitProps: any) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("profilePic", values.picture.name);
    const userResponse = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      body: formData,
    });
    const newUser = await userResponse.json();
    onSubmitProps.resetForm();
    if (newUser) {
      setPageType("login");
    }
  };

  const login = async (values: any, onSubmitProps: any) => {
    const loginResponse = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedInUser = await loginResponse.json();
    if (loginResponse.status === 200 && loggedInUser) {
      onSubmitProps.resetForm();
      dispatch(
        setLogin({
          user: loggedInUser.user,
          token: loggedInUser.token,
        })
      );
      navigate("/home");
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialLoginValue : initialRegisterValue}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0,1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobile ? undefined : "span 4",
              },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFromValue).firstName}
                  name="firstName"
                  error={Boolean((touched as RegisterTouched).firstName) && Boolean((errors as RegisterErrors).firstName)}
                  helperText={(touched as RegisterTouched).firstName && (errors as RegisterErrors).firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFromValue).lastName}
                  name="lastName"
                  error={Boolean((touched as RegisterTouched).lastName) && Boolean((errors as RegisterErrors).lastName)}
                  helperText={(touched as RegisterTouched).lastName && (errors as RegisterErrors).lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFromValue).location}
                  name="location"
                  error={Boolean((touched as RegisterTouched).location) && Boolean((errors as RegisterErrors).location)}
                  helperText={(touched as RegisterTouched).location && (errors as RegisterErrors).location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={(values as RegisterFromValue).occupation}
                  name="occupation"
                  error={Boolean((touched as RegisterTouched).occupation) && Boolean((errors as RegisterErrors).occupation)}
                  helperText={(touched as RegisterTouched).occupation && (errors as RegisterErrors).occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box gridColumn="span 4" border={`1px solid ${(palette as any).neutral.medium}`} borderRadius="5px" p="1rem">
                  <Dropzone
                    accept={{
                      "image/jpeg": [".jpeg", ".png"],
                    }}
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!(values as any).picture ? (
                          <p>Add Photo Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{(values as any).picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          {/* Buttons */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: (palette.background as any).alt,
                "&:hover": {
                  color: palette.primary.main,
                },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin ? "Don't have an account? Sign up here..." : "Already have an account? Login here..."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
