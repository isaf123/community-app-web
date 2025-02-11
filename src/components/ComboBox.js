"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ComboBoxRuangan = ({ tag, setTag, data }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Popover onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[220px] justify-between mt-5"
          >
            Search by tags
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>tidak tersedia</CommandEmpty>
              <CommandGroup>
                {data?.map((arr) => (
                  <CommandItem
                    key={arr.tags_id}
                    value={arr.tag}
                    onSelect={() => {
                      if (!tag?.includes(arr.tag) && tag) {
                        setTag([...tag, arr.tag]);
                      }
                    }}
                  >
                    <div className="flex gap-2 items-center">
                      <div className="w-4">
                        <Check
                          className={cn(
                            " h-4 w-4",
                            tag?.includes(arr.tag) ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                      <div className="break-words">{arr.tag}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button className="ml-2" variant="ghost" onClick={() => setTag([])}>
        reset
      </Button>
    </div>
  );
};

export default ComboBoxRuangan;
