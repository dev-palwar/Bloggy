interface IDS {
  params: {
    blogId: string;
    userId: string;
  };
}

interface LoggedInUser {
  userId: string;
  email: string;
  avatar: string;
}

interface Comments {
  id: string;
  comment: string;
  author: User;
}
