import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import { FormLabel, Input } from "@chakra-ui/react";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange }) => (
          <Form>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              value={values.username}
              onChange={handleChange}
              id="username"
              placeholder="username"
            />
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default register;
