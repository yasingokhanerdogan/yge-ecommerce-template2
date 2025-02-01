import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  withAsterisk?: boolean;
  label?: string;
  error?: string;
  isLoading?: boolean;
}

export const FormTextArea = ({
  withAsterisk = false,
  label,
  error,
  ...props
}: FormTextAreaProps) => {
  return (
    <div className="grid gap-1">
      <div className="flex items-center justify-between">
        {label && (
          <Label
            className={cn(
              withAsterisk &&
                "after:content-['*'] after:text-sm after:text-red-500 after:ml-0.5",
            )}
          >
            {label}
          </Label>
        )}
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
      <Textarea {...props} />
    </div>
  );
};
