import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

function classNames(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-60 disabled:pointer-events-none";

export function LightButton({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        "px-3 py-1 border border-black border-2 bg-white text-gray-900 text-sm hover:bg-gray-100",
        focusRing,
        className
      )}
    />
  );
}

export function MediumButton({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        "px-3 py-1 border-black border-2 bg-gray-400 text-black text-sm hover:bg-gray-500 hover:text-white",
        focusRing,
        className
      )}
    />
  );
}

export function DarkButton({ className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(
        "px-3 py-1 border border-black bg-gray-600 text-white text-sm hover:bg-gray-700",
        focusRing,
        className
      )}
    />
  );
}


