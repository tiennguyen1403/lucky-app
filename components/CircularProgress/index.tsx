import React from "react";

type Props = {
  label?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const CircularProgress: React.FC<Props> = (props) => {
  const { label, size = "md" } = props;

  const initClassName = "z-0 relative overflow-hidden text-primary animate-spinner-ease-spin";
  const mappingSize: Record<string, string> = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-24 h-24",
  };
  const mappingStrokeWidth: Record<string, string> = {
    sm: "2",
    md: "3",
    lg: "3",
  };
  const mappingR: Record<string, string> = {
    sm: "14",
    md: "13",
    lg: "13",
  };
  const mappingStrokeDasharray: Record<string, string> = {
    sm: "87.96459430051421 87.96459430051421",
    md: "81.68140899333463 81.68140899333463",
    lg: "81.68140899333463 81.68140899333463",
  };
  const mappingStrokeDashoffset: Record<string, string> = {
    sm: "65.97344572538566",
    md: "61.26105674500097",
    lg: "61.26105674500097",
  };

  const svgClassName = [initClassName, mappingSize[size]].join(" ");

  return (
    <div className="flex flex-col justify-center gap-1 max-w-fit items-center">
      <div className="relative block">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          strokeWidth={mappingStrokeWidth[size]}
          className={svgClassName}
        >
          <circle
            cx="16"
            cy="16"
            r={mappingR[size]}
            role="presentation"
            strokeDasharray={mappingStrokeDasharray[size]}
            strokeDashoffset="0"
            transform="rotate(-90 16 16)"
            strokeLinecap="round"
            className="h-full stroke-default-300/50"
          ></circle>
          <circle
            cx="16"
            cy="16"
            r={mappingR[size]}
            role="presentation"
            strokeDasharray={mappingStrokeDasharray[size]}
            strokeDashoffset={mappingStrokeDashoffset[size]}
            transform="rotate(-90 16 16)"
            strokeLinecap="round"
            className="h-full stroke-current transition-all !duration-500"
          ></circle>
        </svg>
      </div>
      {label && <span className="text-sm leading-5">{label}</span>}
    </div>
  );
};

export default CircularProgress;
