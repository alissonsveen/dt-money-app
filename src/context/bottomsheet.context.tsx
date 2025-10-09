import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { TouchableWithoutFeedback } from "react-native";

interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode, index: number) => void;
  closeBottomSheet: () => void;
}

export const BottomSheetContext = createContext({} as BottomSheetContextType);

export const BottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [index, setIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["70%", "90%"];

  const openBottomSheet = useCallback(
    (newContent: React.ReactNode, index: number) => {
      setContent(newContent);
    },
    []
  );

  const closeBottomSheet = useCallback(() => {
    setContent(null);
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}

      {isOpen && <TouchableWithoutFeedback></TouchableWithoutFeedback>}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        style={{ zIndex: 2 }}
        index={index}
      >
        <BottomSheetScrollView>{content}</BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};
