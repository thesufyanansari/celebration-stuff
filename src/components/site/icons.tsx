import type { SVGProps } from "react";

export function PinterestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.79-.167-2.005.035-2.868.182-.78 1.176-4.973 1.176-4.973s-.3-.6-.3-1.487c0-1.394.808-2.435 1.814-2.435.855 0 1.268.642 1.268 1.412 0 .86-.548 2.146-.83 3.34-.236.998.5 1.812 1.485 1.812 1.782 0 3.152-1.879 3.152-4.591 0-2.4-1.725-4.078-4.188-4.078-2.853 0-4.528 2.14-4.528 4.35 0 .862.332 1.786.746 2.288a.3.3 0 0 1 .07.288c-.076.317-.246.998-.28 1.137-.043.183-.145.222-.335.134-1.25-.582-2.03-2.408-2.03-3.876 0-3.156 2.293-6.055 6.612-6.055 3.47 0 6.168 2.473 6.168 5.777 0 3.448-2.174 6.222-5.192 6.222-1.014 0-1.967-.527-2.293-1.15l-.624 2.38c-.226.87-.836 1.957-1.245 2.62A10 10 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12" />
    </svg>
  );
}
