import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogOverlay } from "@/component/ui/dialog";

interface BasicModalProps {
  children: React.ReactNode;
  click: boolean;
}

export default function BasicModal({ children, click }: BasicModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (click) setOpen(true);
  }, [click]);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay onClick={handleClose} />
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-md">
        {children}
      </DialogContent>
    </Dialog>
  );
}
