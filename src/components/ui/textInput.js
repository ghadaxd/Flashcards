import React from "react";
import styled from "styled-components/native";

import { white } from "../../utils/colors";

export default TextInput = (props) => {
  return <CustomTextInput {...props} />;
};

const CustomTextInput = styled.TextInput`
  background-color: ${white};
  height: ${(props) => props.height};
  width: 90%;
  padding-left: 3%;
  border-radius: 5px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.075);
`;
