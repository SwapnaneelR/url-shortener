import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
  ElementType,
  HTMLAttributes,
} from "react";
import { cn } from "@/lib/utils"; // Ensure this util exists

// Context to track if the mouse is inside the card
const CardContext = createContext({ isInside: false });
const useCardContext = () => useContext(CardContext);

// Mouse enter hook using context
const useMouseEnter = () => {
  const { isInside } = useCardContext();
  return [isInside];
};

// Root Card Container
export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [isInside, setIsInside] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={containerRef}
      className={cn("relative group perspective", containerClassName)}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
    >
      <CardContext.Provider value={{ isInside }}>
        <div
          className={cn(
            "relative transform-style-preserve-3d transition-all duration-500 ease-linear group-hover:rotate-x-6 group-hover:rotate-y-6 group-hover:rotate-z-1",
            className
          )}
        >
          {children}
        </div>
      </CardContext.Provider>
    </div>
  );
};

// Card Body
export const CardBody = ({
  children,
  className,
  animate = true,
}: {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInside] = useMouseEnter();

  useEffect(() => {
    if (!animate || !cardRef.current) return;

    const el = cardRef.current;
    if (isInside) {
      el.style.transform = "rotateX(6deg) rotateY(6deg) rotateZ(1deg)";
    } else {
      el.style.transform = "rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
    }
  }, [isInside, animate]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-xl bg-white shadow-md p-6 transition-transform duration-500 ease-linear",
        className
      )}
    >
      {children}
    </div>
  );
};

// Individual Item in 3D Space
export const CardItem = <T extends HTMLElement>({
  as,
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
} & HTMLAttributes<T>) => {
  const Component = as || "div";
  const ref = useRef<T>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Component
      ref={ref}
      className={cn("transition duration-500 ease-linear", className)}
      {...rest}
    >
      {children}
    </Component>
  );
};
