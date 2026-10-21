import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { DirectoryNotConnectedError } from "@/lib/directory";

type Options = {
  id: string;
  error: Error | null;
  hasData: boolean;
  errorTitle: string;
  successTitle: string;
};

/** Error toast when a fetch fails, success toast when a later retry recovers. */
export function useFetchToasts({ id, error, hasData, errorTitle, successTitle }: Options) {
  const failedBefore = useRef(false);

  useEffect(() => {
    if (!error) return;
    failedBefore.current = true;
    const description =
      error instanceof DirectoryNotConnectedError
        ? "Connect the company database to load the directory."
        : error.message;
    toast.error(errorTitle, { id: `${id}-error`, description });
  }, [error, id, errorTitle]);

  useEffect(() => {
    if (hasData && !error && failedBefore.current) {
      failedBefore.current = false;
      toast.dismiss(`${id}-error`);
      toast.success(successTitle, { id: `${id}-success` });
    }
  }, [hasData, error, id, successTitle]);
}
