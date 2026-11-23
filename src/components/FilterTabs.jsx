import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Radius, Spacing, Typography } from "../constants/theme";

export default function FilterTabs(props) {
  function mapOptions() {
    const result = props.options.map((option) => {
      let buttonStyle = styles.button;
      let textStyle = styles.text;
      if (option.key === props.selected) {
        buttonStyle = styles.buttonSelected;
        textStyle = styles.textSelected;
      }

      return (
        <Pressable
          key={option.key}
          onPress={() => {
            props.onSelect(option.key);
          }}
          style={buttonStyle}
        >
          <Text style={textStyle}>{option.label}</Text>
        </Pressable>
      );
    });
    return result;
  }

  return <View style={styles.filterRow}>{mapOptions()}</View>;
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Radius.pill,
    minHeight: Spacing.minButtonHeight,
    padding: Spacing.small,
  },
  buttonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: Radius.pill,
    minHeight: Spacing.minButtonHeight,
    padding: Spacing.small,
  },
  filterRow: {
    flexDirection: "row",
    gap: Spacing.extraSmall,
    justifyContent: "center",
  },
  text: {
    color: Colors.primary,
    fontSize: Typography.body,
    fontWeight: Typography.weightRegular,
  },
  textSelected: {
    color: Colors.textOnPrimary,
    fontSize: Typography.body,
    fontWeight: Typography.weightMedium,
  },
});
