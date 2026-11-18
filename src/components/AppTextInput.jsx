import { Colors, Radius, Spacing, Typography } from "@/constants/theme";
import { StyleSheet, TextInput } from "react-native";

export default function AppTextInput(props) {
  return (
    <>
      <TextInput
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
        onSubmitEditing={props.onSubmitEditing}
        value={props.value}
        autoCapitalize={props.autoCapitalize}
        autoComplete={props.autoComplete}
        autoCorrect={props.autoCorrect}
        style={[styles.input, props.style]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.surface,
    padding: Spacing.small,
    borderRadius: Radius.default,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    fontSize: Typography.body,
    color: Colors.text,
  },
});
