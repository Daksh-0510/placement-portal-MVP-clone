import { Link, useRouter, type ErrorComponentProps } from "@tanstack/react-router";

import { primaryButtonClass, secondaryButtonClass, StatePanel } from "./state-panel";

export function RouteError({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const message = error instanceof Error ? error.message : "An unexpected error occurred.";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <StatePanel
        eyebrow="Something went wrong"
        title="This section could not be displayed."
        description={message}
        actions={
          <>
            <button
              type="button"
              className={primaryButtonClass}
              onClick={() => {
                router.invalidate();
                reset();
              }}
            >
              Try again
            </button>
            <Link to="/" className={secondaryButtonClass}>
              Back to Directory
            </Link>
          </>
        }
      />
    </div>
  );
}
