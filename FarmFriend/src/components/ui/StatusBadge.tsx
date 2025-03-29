
import { cn } from "@/lib/utils";

type StatusType = "healthy" | "mild" | "severe";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    healthy: {
      color: "bg-status-healthy",
      text: "Healthy",
    },
    mild: {
      color: "bg-status-mild",
      text: "Mild Disease",
    },
    severe: {
      color: "bg-status-severe",
      text: "Severe Disease",
    },
  };

  const config = statusConfig[status];

  return (
    <div 
      className={cn(
        `${config.color} text-white text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center`,
        className
      )}
    >
      <span className="w-2 h-2 bg-white rounded-full mr-1.5"></span>
      {config.text}
    </div>
  );
};

export default StatusBadge;
