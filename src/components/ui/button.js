import React from "react";
import styled from "styled-components/native";

import { white, purple } from "../../utils/colors";

export default Button = (props) => {
  return (
    <CustomButton {...props}>
      <BtnTitle type={props.type}>{props.title}</BtnTitle>
    </CustomButton>
  );
};

const CustomButton = styled.TouchableOpacity`
  background-color: ${(props) =>
    props.type === "primary" || props.type === "primary-small"
      ? purple
      : "transparent"};
  border-width: 1px;
  border-color: ${purple};
  height: ${(props) =>
    props.type === "primary-small" || props.type === "secondary-small"
      ? "100%"
      : "6%"};
  width: ${(props) =>
    props.type === "primary-small" || props.type === "secondary-small"
      ? "50%"
      : "90%"};
  margin-top: ${(props) =>
    props.type === "primary-small" || props.type === "secondary-small"
      ? 0
      : "5%"};
  align-items: center;
  justify-content: center;
  border-radius: ${(props) =>
    props.type === "primary-small" || props.type === "secondary-small"
      ? 0
      : "5px"};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.075);
`;

const BtnTitle = styled.Text`
  color: ${(props) =>
    props.type === "primary" || props.type === "primary-small"
      ? white
      : purple};
`;
