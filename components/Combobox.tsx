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

export function ComboboxDemo({
  value,
  onChange,
  disabled,
  data,
  title,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  data: { value: string; label: string }[];
  title: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      >
        <Button
          variant="default"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-white text-black hover:bg-white"
          disabled={disabled}
        >
          {value ? data.find((data) => data.value === value)?.label : title}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className="w-[45vh] max-sm:w-[39vh] cursor-pointer dark:bg-gray-700">
          <CommandList>
            <CommandGroup>
              {data.map((data) => (
                <CommandItem
                  key={data.value}
                  value={data.value}
                  className="cursor-pointer"
                  onSelect={(currentValue) => {
                    if (!disabled) {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }
                  }}
                >
                  {data.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === data.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
