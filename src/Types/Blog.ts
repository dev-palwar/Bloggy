interface Blog {
  id: string;
  title: string;
  poster?: string;
  createdAt: string;
  description: string;
  Author: Author;
  category: Category[];
  tags?: string[];
  upvotes?: Author[];
  comments?: Comment[];
}

interface Comment {
  id: string;
  comment: string;
  user: Author;
  upvotes?: Author[];
  createdAt: string;
}

enum Category {
  PROGRAMMING,
  ANIME,
  MEDIA,
  SELF_IMPROVEMENT,
  RELATIONSHIP,
  DARK,
  POLITICS,
  GAMING,
}
