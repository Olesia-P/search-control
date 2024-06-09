/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, MutableRefObject } from "react";

export default function useClickOutsideClose(
  setOpeningState: React.Dispatch<React.SetStateAction<boolean>>,
  openingState: boolean,
  openingButtonRef: React.MutableRefObject<HTMLDivElement | null>,
  portalContainerRef: React.MutableRefObject<HTMLDivElement | null>
): MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      ref.current &&
      (!ref.current.contains(event.target as Node) ||
        (openingButtonRef.current &&
          !openingButtonRef.current.contains(event.target as Node))) &&
      portalContainerRef.current &&
      !portalContainerRef.current.contains(event.target as Node)
    ) {
      setOpeningState(false);
    }
  };

  useEffect(() => {
    if (openingState) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openingState]);

  return ref;
}
