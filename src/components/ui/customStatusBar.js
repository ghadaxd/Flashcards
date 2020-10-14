import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
// import Constants from "expo-constants";
import { purple } from "../../utils/colors";

export default CustomStatusBar = () => {
  return (
    <View style={{ backgroundColor: purple }}>
      <StatusBar style="light" />
    </View>
  );
};

{
  /* <View
style={{ height: Constants.statusBarHeight, backgroundColor: purple }}
> */
}
