export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  author: string;
  content: string;
  likes: number;
  reposts?: number;
  comments_count: number;
  comments: Comment[];
  imageUrl?: string;
  mediaUrls?: string[];
  isLiked?: boolean;
  isReposted?: boolean;
}
