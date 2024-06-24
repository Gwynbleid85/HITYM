import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CardFooter } from "../ui/card";
import { ButtonLoading } from "../ui/button-loading";
import { Separator } from "../ui/separator";

interface CustomCardFooterProps {
  buttonText: string;
  backPath: string;
  buttonOnClick?: () => void;
  buttonType?: "button" | "submit";
  isSubmitting?: boolean;
  isAuthorized?: boolean;
}

const CustomCardFooter: React.FC<CustomCardFooterProps> = ({
  buttonText,
  backPath,
  buttonOnClick,
  buttonType = "button",
  isSubmitting = false, // Default to false if not provided
  isAuthorized = true, // Default to true if not provided
}) => {
  const navigate = useNavigate();

  return (
    <>
      <Separator />
      <CardFooter className="flex w-full justify-around mt-3 pb-3">
        <Button variant="secondary" size="icon" onClick={() => navigate(backPath)}>
          <ArrowLeft />
        </Button>
        {isAuthorized && ( // Wrap in conditional rendering for authorization
          <div>
            {isSubmitting && buttonType === "submit" ? (
              <ButtonLoading />
            ) : (
              // Only show second button even if first condition is met
              <Button className="px-5 h-fit" onClick={buttonOnClick} type={buttonType}>
                <span className="py-1">{buttonText}</span>
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </>
  );
};

export default CustomCardFooter;
