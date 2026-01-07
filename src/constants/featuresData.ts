import { LuRocket } from "react-icons/lu";
import type { FeatureItemProps } from "@/types";
import { FiInfo, FiLifeBuoy, FiRotateCcw } from "react-icons/fi";

export const features: FeatureItemProps[] = [
  {
    icon: LuRocket,
    title: "Free Shipping",
    subtitle: "Orders $50 or more",
  },
  {
    icon: FiRotateCcw,
    title: "Free Returns",
    subtitle: "Within 7 days",
  },
  {
    icon: FiInfo,
    title: "Get 20% Off 1 Item",
    subtitle: "When you sign up",
  },
  {
    icon: FiLifeBuoy,
    title: "We Support",
    subtitle: "24/7 amazing services",
  },
];