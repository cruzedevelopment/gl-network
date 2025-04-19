"use client";

import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RocketIcon, Users, Star } from "lucide-react";
import { useEffect, useState } from "react";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

type ReviewData = {
  name: string;
  image: string;
  text: string;
  stars: number;
};

function ReviewShape({
  className,
  delay = 0,
  width = 400,
  rotate = 0,
  gradient = "from-white/[0.08]",
  review,
  direction = "left",
}: {
  className?: string;
  delay?: number;
  width?: number;
  rotate?: number;
  gradient?: string;
  review: ReviewData;
  direction?: "left" | "right" | "top" | "bottom";
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case "left":
        return { x: "-100vw", y: 0, opacity: 0, rotate: rotate - 15 };
      case "right":
        return { x: "100vw", y: 0, opacity: 0, rotate: rotate + 15 };
      case "top":
        return { x: 0, y: "-100vh", opacity: 0, rotate: rotate - 15 };
      case "bottom":
        return { x: 0, y: "100vh", opacity: 0, rotate: rotate + 15 };
      default:
        return { x: 0, y: "-100vh", opacity: 0, rotate: rotate - 15 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      animate={{
        x: 0,
        y: 0,
        opacity: 1,
        rotate: rotate,
      }}
      transition={{
        duration: 1.8,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
        }}
        className="relative"
      >
        <div
          className={cn(
            "rounded-2xl",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-md border border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "flex flex-col",
            "overflow-hidden"
          )}
        >
          <div className="flex items-center gap-3 p-4 pb-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20">
              <Image
                src={review.image}
                alt={review.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium text-sm">{review.name}</p>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < review.stars
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-500"
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 pb-4">
            <p className="text-white/80 text-xs leading-relaxed italic">
              "{review.text}"
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroGeometricClient({
  badge = "Growth Language",
  title1 = "Build Your Brand.",
  title2 = "Monetize Your Voice.",
}: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const seedRandom = (seed: number) => {
    return (index: number) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
    };
  };

  const randomGenerator = seedRandom(42);

  const getReviewSize = (baseWidth: number, review: ReviewData) => {
    const textLength = review.text.length;
    let width = baseWidth;

    if (windowSize.width < 640) {
      width = baseWidth * 0.7;
    }

    return {
      width,
    };
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const reviews = [
    {
      name: "Sarah Johnson",
      image:
        "https://i.pinimg.com/736x/b9/b5/fb/b9b5fbe0ce482fb220303222f70fcac0.jpg",
      text: "Growth Language helped me build my personal brand from scratch. The community is incredibly supportive and the resources are invaluable!",
      stars: 5,
    },
    {
      name: "Michael Chen",
      image:
        "https://www.boredpanda.com/blog/wp-content/uploads/2022/06/female-anime-characters-49-62a06ae079745__700.jpg",
      text: "I've tried many creator communities, but none compare to Growth Language. The strategies I've learned here have doubled my audience in just 3 months.",
      stars: 5,
    },
    {
      name: "Aisha Patel",
      image:
        "https://w0.peakpx.com/wallpaper/363/538/HD-wallpaper-anime-anime-girls-women-winter-snow-train-traffic-lights-headphones-mist-red-light-snow-covered.jpg",
      text: "The monetization strategies taught here are game-changing. I'm now earning a full-time income from my content thanks to Growth Language!",
      stars: 5,
    },
    {
      name: "James Wilson",
      image:
        "https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg",
      text: "The networking opportunities alone are worth joining. I've collaborated with amazing creators and grown my business exponentially.",
      stars: 4,
    },
  ];

  const getReviewPositions = () => {
    const isMobile = windowSize.width < 768;
  
    if (isMobile) {
      return [
        { className: "left-[-15%] top-[10%]", direction: "left" },
        { className: "right-[-15%] top-[20%]", direction: "right" }, // Michael Chen moved higher (from 30% to 20%)
        { className: "left-[-15%] top-[60%]", direction: "left" },   // Aisha Patel moved lower (from 50% to 60%)
        { className: "right-[-15%] top-[70%]", direction: "right" },
      ];
    }
  
    return [
      { className: "left-[5%] top-[20%]", direction: "left" },
      { className: "right-[5%] top-[15%]", direction: "right" },
      { className: "left-[10%] bottom-[15%]", direction: "bottom" },
      { className: "right-[10%] bottom-[20%]", direction: "right" },
    ];
  };  

  const reviewPositions = getReviewPositions();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        {reviews.map((review, index) => {
          const randomValue = randomGenerator(index) * 10 + 5;
          const rotateValue = (index % 2 === 0 ? 1 : -1) * randomValue;
          const baseWidth = windowSize.width < 640 ? 220 : 280;

          return (
            <ReviewShape
              key={index}
              delay={0.3 + index * 0.15}
              width={baseWidth}
              rotate={rotateValue}
              gradient={
                index === 0
                  ? "from-indigo-500/[0.15]"
                  : index === 1
                  ? "from-rose-500/[0.15]"
                  : index === 2
                  ? "from-violet-500/[0.15]"
                  : "from-amber-500/[0.15]"
              }
              className={reviewPositions[index].className}
              review={review}
              direction={
                reviewPositions[index].direction as
                  | "left"
                  | "right"
                  | "top"
                  | "bottom"
              }
            />
          );
        })}
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
          >
            <Image
              src="https://i.postimg.cc/Hs8gsvJW/LOGO-3.png"
              alt="Growth Language"
              width={20}
              height={20}
            />
            <span className="text-sm text-white/60 tracking-wide">{badge}</span>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tight">
              <div className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 mb-2">
                {title1}
              </div>
              <div
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-300 to-blue-800 whitespace-nowrap py-2",
                  pacifico.className
                )}
                style={{ lineHeight: 1.4 }}
              >
                {title2}
              </div>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4 mt-4">
              Join the Growth Language community to create, learn, earn, and
              grow your personal brand with fellow creators!
            </p>
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <a
                href="https://whop.com/growthlanguage/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[7px_5px_56px_-14px_#4338ca] active:shadow-[7px_5px_56px_-10px_#4338ca] active:scale-[0.97]"
              >
                <span>Get Started</span>
                <RocketIcon size={18} className="animate-pulse" />
              </a>
              <a
                href="https://discord.gg/hBa9t9qn4w"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-full border border-white/20 hover:bg-white/15 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Discord</span>
                <Users size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

export default function HeroGeometric(props: {
  badge?: string;
  title1?: string;
  title2?: string;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  return <HeroGeometricClient {...props} />;
}
