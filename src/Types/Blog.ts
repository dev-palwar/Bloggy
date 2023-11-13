interface Blog {
  id: string;
  title: string;
  poster?: string;
  createdAt: string;
  description: string;
  author: User;
  category: Category[];
  upvotes?: Author[];
  comments?: Comment[];
}

interface Comment {
  id: string;
  comment: string;
  user: User;
  upvotes?: User[];
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
