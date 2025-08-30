// donor flow (How it works page)

import { Building2,  Clock, Camera, Brain } from 'lucide-react';

export const donorFlow = [
    {
      step: "1",
      title: "Register & Login",
      description: "Create account as Restaurant or Household donor",
      icon: Building2
    },
    {
      step: "2",
      title: "Add Food Details",
      description: "Upload photos, quantity, expiry date, and location",
      icon: Camera
    },
    {
      step: "3",
      title: "AI Processing",
      description: "System analyzes food quality and predicts shelf-life",
      icon: Brain
    },
    {
      step: "4",
      title: "Track Pickup",
      description: "Monitor NGO response and pickup status in real-time",
      icon: Clock
    }
  ];