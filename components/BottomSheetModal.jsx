import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {forwardRef, useCallback, useMemo} from 'react';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';

const BottomSheetModal = ({sheetRef, snapPoint, children}) => {
  // variables
  const snapPoints = useMemo(() => snapPoint, ['50%']);

  // callbacks
  const handleSheetChange = useCallback(index => {
    // console.log('handleSheetChange', index);
  }, []);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
      />
    ),
    [],
  );

  const animationConfigs = useCallback(
    useBottomSheetSpringConfigs({
      damping: 80,
      overshootClamping: true,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1,
      stiffness: 500,
    }),
    [],
  );

  return (
    <View style={[styles.container]}>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        animationConfigs={animationConfigs}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChange}>
        <BottomSheetView style={[styles.contentContainer]}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
