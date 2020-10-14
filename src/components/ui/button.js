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
    props.type === "primary" ? purple : "transparent"};
  border-width: 1px;
  border-color: ${purple};
  height: 5.5%;
  width: 90%;
  margin-top: 5%;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.075);
`;

const BtnTitle = styled.Text`
  color: ${(props) => (props.type === "primary" ? white : purple)};
  text-align: center;
  margin-top: 3%;
`;
