"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  label: string;
  action: (id: string) => Promise<{ success: boolean; error?: string }>;
  id: string;
  variant?: "default" | "outline" | "destructive" | "ghost" | "link";
  className?: string;
  successMessage?: string;
}

export function ActionButton({ label, action, id, variant = "default", className, successMessage }: ActionButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!confirm(`Apakah Anda yakin ingin melakukan aksi "${label}"?`)) return;
    
    setLoading(true);
    const res = await action(id);
    if (res.success) {
      alert(successMessage || `Aksi "${label}" berhasil!`);
      // No reload needed if using revalidatePath in server actions, 
      // but for client-side list we might need a refresh or state update.
      window.location.reload(); 
    } else {
      alert("Error: " + res.error);
    }
    setLoading(false);
  };

  return (
    <Button 
      size="sm" 
      variant={variant} 
      className={className} 
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? "⌛" : label}
    </Button>
  );
}
