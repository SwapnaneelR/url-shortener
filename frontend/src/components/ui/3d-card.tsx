import {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
  type ReactNode,
  type ElementType,
  type HTMLAttributes,
  createElement,
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
  children: ReactNode | null;
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
  children: ReactNode | null;
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
  children: ReactNode | null;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
} & HTMLAttributes<T>) => {
  const Component = as || "div";
  const ref = useRef<T>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    if (!ref.current) return;
    const tx = Number(translateX) || 0;
    const ty = Number(translateY) || 0;
    const tz = Number(translateZ) || 0;
    const rx = Number(rotateX) || 0;
    const ry = Number(rotateY) || 0;
    const rz = Number(rotateZ) || 0;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${tx}px) translateY(${ty}px) translateZ(${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return createElement(
    Component as any,
    {
      ref: ref as any,
      className: cn("transition duration-500 ease-linear", className as any),
      ...(rest as any),
    },
    children,
  );
};
