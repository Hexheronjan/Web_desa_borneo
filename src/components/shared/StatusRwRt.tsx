import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RwRtItem {
  name: string;
  count: number;
  status: "Aktif" | "Review" | "Baru";
}

interface StatusRwRtProps {
  title: string;
  items: RwRtItem[];
}

export function StatusRwRt({ title, items }: StatusRwRtProps) {
  const getBadgeColor = (status: string) => {
    switch (status) {
      case "Aktif": return "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200";
      case "Review": return "bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200";
      case "Baru": return "bg-slate-100 text-slate-800 hover:bg-slate-100 border-slate-200";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-sm font-bold text-slate-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-lg border bg-slate-50">
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.count} entri</p>
                </div>
                <Badge variant="outline" className={getBadgeColor(item.status)}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
