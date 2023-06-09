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
  // ボトムシートの参照
  const sheetRef = useRef<BottomSheetRef>(null);

  // useImperativeHandleを使用することで、親コンポーネントから子コンポーネントのメソッドを呼び出せるようにする
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
      // ボトムシートをドラッグしたとき変更できる高さの範囲
      snapPoints={({ minHeight, headerHeight }) => [
        // 最小の高さ
        headerHeight,
        // 最大の高さ
        minHeight,
      ]}
      // オーバーレイを削除して後ろの要素をクリックできるようにする
      blocking={false}
      // ボトムシートのヘッダー部分
      header={props.header}
      skipInitialTransition
    >
      {props.children}
    </BottomSheet>
  );
};

export const BtmSheet = forwardRef(BtmSheetComponent);
