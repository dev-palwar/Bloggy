interface Author {
  id: string;
  name: string;
  bio: string;
  nationality: string;
  avatar: string;
  blogs: Blog[];
  following: User[];
  followers: User[];
}

interface User {
  id: string;
  avatar?: string;
  name: string;
  email: string;
  nationality?: string;
  createdAt: string;
}
