import React from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();

  return (
    <Flex bg="teal" p="4">
      <Box ml={"auto"}>
        {!fetching && !data?.me && (
          <>
            <NextLink href={"/login"}>
              <Link color={"white"} mr={2}>
                Login
              </Link>
            </NextLink>
            <NextLink href={"/register"}>
              <Link color={"white"}>Register</Link>
            </NextLink>
          </>
        )}
        {!fetching && data?.me && (
          <Flex>
            <Box mr={2}>{data.me.username}</Box>
            <NextLink href={"/logout"}>
              <Link color={"white"}>Logout</Link>
            </NextLink>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default NavBar;
