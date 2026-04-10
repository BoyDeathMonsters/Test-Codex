import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet, View } from 'react-native';
import { palette } from '../theme/palette';

export const VirtualJoystick = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const responder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    })
  ).current;

  return (
    <View style={styles.base}>
      <Animated.View style={[styles.knob, { transform: pan.getTranslateTransform() }]} {...responder.panHandlers} />
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#4D666D',
    backgroundColor: 'rgba(23, 35, 40, 0.45)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  knob: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: palette.primary,
    opacity: 0.8
  }
});
