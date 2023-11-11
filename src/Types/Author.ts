interface Author {
  id: string;
  name: string;
  bio: string;
  nationality: string;
  avatar: string;
  blogs: Blog[];
  following: Author[];
  followers: Author[];
}
