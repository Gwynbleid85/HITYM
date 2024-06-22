import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CardFooter } from "./ui/card";
import { ButtonLoading } from "./ui/button-loading";
import { Separator } from "./ui/separator";

interface CustomCardFooterProps {
  buttonText: string;
  backPath: string;
  buttonOnClick?: () => void;
  buttonType?: "button" | "submit";
  isSubmitting?: boolean; // Added isSubmitting prop
}

const CustomCardFooter: React.FC<CustomCardFooterProps> = ({
  buttonText,
  backPath,
  buttonOnClick,
  buttonType = "button",
  isSubmitting = false, // Default to false if not provided
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Separator />
      <CardFooter className="flex w-full justify-around mt-3 pb-3">
        <Button variant="secondary" size="icon" onClick={() => navigate(backPath)}>
          <ArrowLeft />
        </Button>

        {isSubmitting && buttonType === "submit" ? (
          <ButtonLoading />
        ) : (
          <Button className="px-5 h-fit" onClick={buttonOnClick} type={buttonType}>
            <span className="py-1">{buttonText}</span>
          </Button>
        )}
      </CardFooter>
    </>
  );
};

export default CustomCardFooter;
