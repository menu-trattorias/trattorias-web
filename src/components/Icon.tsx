"use client";

import {
  ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, Bike, Car, ChefHat, ChevronDown, Clock, Coffee, Facebook, Fish,
  Flower2, HeartPulse, Instagram, Leaf, Mail, MapPin, Menu, Moon, Mountain, Palmtree, Phone, Pizza,
  Plane, Salad, ShieldCheck, Sparkles, Star, Sun, Sunset, Users, UtensilsCrossed, Waves, Wifi, Wine, X,
  Youtube, Music, Calendar, Key, Gamepad2, Soup, Droplets, Wind, Tv, Armchair, MessageCircle, Shirt, Check, Maximize,
  type LucideProps,
} from "lucide-react";

const icons = {
  ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, Bike, Car, ChefHat, ChevronDown, Clock, Coffee, Facebook, Fish,
  Flower2, HeartPulse, Instagram, Leaf, Mail, MapPin, Menu, Moon, Mountain, Palmtree, Phone, Pizza,
  Plane, Salad, ShieldCheck, Sparkles, Star, Sun, Sunset, Users, UtensilsCrossed, Waves, Wifi, Wine, X,
  Youtube, Music, Calendar, Key, Gamepad2, Soup, Droplets, Wind, Tv, Armchair, MessageCircle, Shirt, Check, Maximize,
};

export type IconName = keyof typeof icons;

/** Icons are referenced by name so server pages can pass them as plain data. */
export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = icons[name];
  return <C size={18} strokeWidth={1.8} {...props} />;
}
