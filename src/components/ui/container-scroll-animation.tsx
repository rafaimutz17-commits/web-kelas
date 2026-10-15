"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import romanPillars from "@/assets/roman-pillars.png";

type ContainerScrollProps = {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
};

type HeaderProps = {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
};

type CardProps = {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
};

export function ContainerScroll({
  titleComponent,
  children,
}: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const pillarsY = useTransform(scrollYProgress, [0, 0.2, 0.58, 1], [0, 35, 420, 920]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [0.7, 0.9] : [1.05, 1],
  );
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="container-scroll-stage relative flex h-[60rem] items-center justify-center overflow-hidden p-2 md:h-[80rem] md:p-20"
      ref={containerRef}
    >
      <motion.img
        src={romanPillars}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="container-scroll-pillar container-scroll-pillar-left"
        style={{ y: pillarsY }}
      />
      <motion.img
        src={romanPillars}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="container-scroll-pillar container-scroll-pillar-right"
        style={{ y: pillarsY, scaleX: -1 }}
      />
      <div
        className="container-scroll-content relative z-10 w-full py-10 md:py-40"
        style={{ perspective: "1000px" }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

export function Header({ translate, titleComponent }: HeaderProps) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
}

export function Card({ rotate, scale, children }: CardProps) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[40rem] md:p-6"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
}
