"use client";

import { Button } from "@/components/ui/button";
import { FileDown, FileText } from "lucide-react";

interface ExportButtonProps {
  onExportPdf?: () => void;
  onExportExcel?: () => void;
}

export function ExportButton({ onExportPdf, onExportExcel }: ExportButtonProps) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onExportPdf} className="flex gap-2">
        <FileText size={16} className="text-red-500" />
        PDF
      </Button>
      <Button variant="outline" size="sm" onClick={onExportExcel} className="flex gap-2">
        <FileDown size={16} className="text-green-600" />
        Excel
      </Button>
    </div>
  );
}
