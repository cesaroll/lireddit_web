import React from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { Box, Button } from "@chakra-ui/react";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import {useRegisterMutation} from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {}

const register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values });
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
            // worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="Username" />
            <Box mt={4}>
              <InputField name="email" label="Email"  />
            </Box>
            <Box mt={4}>
              <InputField name="password" label="Password" type="password" />
            </Box>
            <Box mt={4}>
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(register);
