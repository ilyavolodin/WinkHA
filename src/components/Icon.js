import React from 'react';
import MdiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet, View} from 'react-native';
import {globalStyles, tokens} from '../styles';

export const Icon = ({
  name,
  badgeName,
  size = tokens.iconSizes.normal,
  iconStyles = [],
  badgeStyles = [],
  style,
}) => {
  return (
    <View style={[styles.iconWrapper, globalStyles.centeredContent, style]}>
      <MdiIcon
        name={name}
        style={[
          styles.mainIcon(size),
          globalStyles.disabled,
          globalStyles.disabledBackground,
          globalStyles.circle(size * 1.75),
          ...iconStyles,
        ]}
      />
      {badgeName && (
        <MdiIcon
          name={badgeName}
          style={[
            styles.badgeIcon(size),
            globalStyles.tokenDisabledBackground,
            globalStyles.circle(size / 2 / 0.75),
            styles.badgePosition,
            ...badgeStyles,
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'relative',
  },
  mainIcon: (size) => ({
    fontSize: size,
    textAlign: 'center',
    textAlignVertical: 'center',
  }),
  badgeIcon: (size) => ({
    fontSize: size / 2,
    textAlign: 'center',
    textAlignVertical: 'center',
  }),
  badgePosition: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
  },
});
