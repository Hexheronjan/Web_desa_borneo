import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BatchItem {
  time: string;
  title: string;
  desc: string;
}

interface BatchPanelProps {
  title: string;
  items: BatchItem[];
  colorTheme: string;
}

export function BatchPanel({ title, items, colorTheme }: BatchPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-sm font-bold text-slate-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="p-4 space-y-4">
            {items.map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${colorTheme}`} />
                  {i !== items.length - 1 && <div className="w-px h-full bg-slate-200 mt-2" />}
                </div>
                <div className="pb-4">
                  <p className="text-sm font-bold text-slate-700">{item.time}</p>
                  <p className="text-sm font-semibold text-slate-900 mt-1">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
