"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function EmailTypeSelector({ value, onValueChange, disabled }) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full bg-zinc-900 text-white border-zinc-600">
        <SelectValue placeholder="Select email type..." />
      </SelectTrigger>
      <SelectContent 
        className="bg-zinc-800 text-white border-zinc-700"
        position="popper"
        side="bottom"
      >
        <SelectItem value="process1" textValue="Email as Individual">
          Email as Individual
        </SelectItem>
        <SelectItem value="process2" textValue="Email as Business Executive">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-0 px-1.5">
                Pro
              </Badge>
            </div>
            <span className="text-xs text-zinc-400 mt-0.5">uses vector db</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

