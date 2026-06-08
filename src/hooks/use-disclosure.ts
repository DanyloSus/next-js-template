"use client";

import { useCallback, useState } from "react";

/**
 * Open/close state helper for modals, drawers, popovers, etc.
 */
export const useDisclosure = (isInitiallyOpen = false) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(
    () => setIsOpen(isCurrentlyOpen => !isCurrentlyOpen),
    []
  );

  return { isOpen, open, close, toggle };
};
