"use client";

import { Model } from "@/types/database";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ModelSelectorProps {
  models: Model[];
  selectedModel: string;
  onModelChange: (modelTag: string) => void;
}

export function ModelSelector({
  models,
  selectedModel,
  onModelChange,
}: ModelSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="model-select">AI Model</Label>
      <Select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
      >
        <option value="" disabled>
          Select a model...
        </option>
        {models.map((model) => (
          <option key={model.id} value={model.tag}>
            {model.name}
          </option>
        ))}
      </Select>
    </div>
  );
}

