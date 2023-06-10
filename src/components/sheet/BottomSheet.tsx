import "react-spring-bottom-sheet/dist/style.css";

import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef } from "react";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";

interface Props {
  header: React.ReactElement;
  children: React.ReactElement;
}

export interface ChildHandles {
  fullOpen(): void;
  fullClose(): void;
}

const BtmSheetComponent: ForwardRefRenderFunction<ChildHandles, Props> = (props, ref) => {
  const sheetRef = useRef<BottomSheetRef>(null);

  // Allow to call below functions from parent
  useImperativeHandle(ref, () => ({
    fullOpen() {
      sheetRef.current?.snapTo(({ snapPoints }) => Math.max(...snapPoints));
    },
    fullClose() {
      sheetRef.current?.snapTo(({ snapPoints }) => Math.min(...snapPoints));
    },
  }));
  return (
    <BottomSheet
      open
      ref={sheetRef}
      snapPoints={({ minHeight, headerHeight }) => [headerHeight, minHeight]}
      blocking={false}
      header={props.header}
      skipInitialTransition
    >
      {props.children}
    </BottomSheet>
  );
};

export const BtmSheet = forwardRef(BtmSheetComponent);
