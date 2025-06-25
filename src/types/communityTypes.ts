
export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface PostComment {
  id: string;
  author: string;
  author_image: string;
  text: string;
  date: string | Date;
  post_id?: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  description: string;
  author: string;
  author_image: string;
  date: string | Date;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  is_poll?: boolean;
  poll_type?: "single" | "multiple" | null;
  poll_options?: PollOption[];
}
