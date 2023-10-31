import React from "react";
import {  Input, Text, Box } from "zmp-ui";

export default function HomePage(props) {
  return (
    <Box mt={2}>
      <Text  className="input-desc">
      Ghi chú
      </Text>
        <Input placeholder="Ghi chú" />
    </Box>
  );
}