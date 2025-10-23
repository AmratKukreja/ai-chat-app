export interface Model {
  id: string;
  name: string;
  tag: string;
  description: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  user_id: string;
  model_tag: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

