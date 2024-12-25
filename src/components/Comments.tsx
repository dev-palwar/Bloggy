import { addComment, deleteCommentQuery } from "@/API/GraphQl/blog";
import { context, variables } from "@/API/GraphQl/context";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { getLoggedInUser } from "@/lib/user";
import { formateDate } from "@/lib/App";
import Image from "next/image";
import BasicModal from "./Modale";
import { EraserIcon, SendIcon } from "lucide-react";
import { toast, useToast } from "@/hooks/use-toast";

interface CommentComponentParams {
  commentsArr: Comments[] | undefined;
}

export const CommentComponent = (params: CommentComponentParams) => {
  const router = useRouter();
  const { toast } = useToast();
  const pathname = usePathname();
  const blogId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const commentRef = React.useRef<HTMLInputElement>(null);

  const [commentPayload, { error, data }] = useMutation(addComment, context());

  const postComment = (e: React.FormEvent) => {
    e.preventDefault();

    const comment = commentRef.current?.value;

    if (comment) {
      if (getLoggedInUser()) {
        commentPayload({
          variables: {
            input: { blogId, comment },
          },
        });

        if (commentRef.current) commentRef.current.value = "";
        toast({
          description: "Comment Added 👍",
        });
      } else {
        router.push("/login");
        toast({
          description: "You need to log in sir",
        });
      }
    } else {
      toast({
        description: "Comment cannot be empty 🚫",
      });
    }
  };

  return (
    <>
      <div className="comment-section border mt-[1rem] p-[1rem] mb-[1rem]">
        <h1 className="font-bold mb-[1rem] text-[2rem]">Comments</h1>
        <div className="flex justify-between">
          <form onSubmit={postComment}>
            <input
              ref={commentRef}
              type="text"
              name="comment"
              id="comment"
              className="outline-none"
              placeholder="Write your thoughts here..."
            />
          </form>
          <button type="submit" onClick={postComment}>
            <SendIcon />
          </button>
        </div>
      </div>
      <div className="max-h-[65vh] overflow-scroll">
        {params.commentsArr?.map((commentObj: Comments) => (
          <Comments key={commentObj.id} commentObj={commentObj} />
        ))}
      </div>
    </>
  );
};

const Comments = ({ commentObj }: { commentObj: Comments }) => {
  const [deleteCommentPayload, deleteCommentState] = useMutation(
    deleteCommentQuery,
    context()
  );

  const deleteComment = (commentId: string) => {
    deleteCommentPayload(variables(commentId));
  };

  React.useEffect(() => {
    if (deleteCommentState.data) toast({ description: "Comment deleted 👍" });
  }, [deleteCommentState.data]);

  return (
    <div key={commentObj.id} className="comments">
      {deleteCommentState.error && (
        <BasicModal click={true}>{deleteCommentState.error.message}</BasicModal>
      )}
      <div className="comment p-[1rem]">
        <div className="author-info flex items-center justify-between mb-3">
          <div className="flex gap-3 items-center">
            <Link href={`/profile/${commentObj.author.id}`}>
              <div className="h-[35px] w-[35px]">
                <Image
                  height={200}
                  width={200}
                  src={commentObj.author.avatar || ""}
                  alt={commentObj.author.name}
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
            </Link>
            <p>{commentObj.author.name}</p>
            <p className="text-[15px] opacity-50">
              {formateDate(commentObj.createdAt.toString())}
            </p>
          </div>
          <div
            onClick={() => deleteComment(commentObj.id)}
            className="cursor-pointer
            "
          >
            {getLoggedInUser()?.userId == commentObj.author.id && (
              <EraserIcon />
            )}
          </div>
        </div>
        <p>{commentObj.comment}</p>
      </div>
    </div>
  );
};
