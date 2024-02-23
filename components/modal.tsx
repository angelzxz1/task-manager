import * as React from "react";

import { cn } from "@/lib/utils";

export interface DialogProps
    extends React.DialogHTMLAttributes<HTMLDialogElement> {
    children: React.ReactNode;
}

const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <dialog
                className={cn(
                    `h-full w-full bg-black/80 rounded-md p-4 text-white z-[998]`,
                    className
                )}
                ref={ref}
                {...props}
            >
                <div className="flex h-full w-full items-center justify-center">
                    {children}
                </div>
            </dialog>
        );
    }
);
Dialog.displayName = "Dialog";

export { Dialog };
