
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right"
      toastOptions={{
        style: {
          background: 'var(--military-card)',
          border: '1px solid var(--cyber-fuchsia)',
          color: 'var(--warm-gray)',
        },
      }}
    />
  );
}
