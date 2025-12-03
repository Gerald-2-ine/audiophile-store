"use client";

import { Suspense } from "react";
import ConfirmationContent from "./confirmationContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
