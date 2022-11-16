import { useMutation, useQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Avatar from "../../components/Avatar";
import Post from "../../components/Post";
import { ADD_COMMENTS } from "../../graphql/mutations";
import { GET_ALL_POSTS_BY_ID } from "../../graphql/queries";
import TimeAgo from "react-timeago";

type FormData = {
  comment?: string;
};

export default function PostPage() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const { data: session } = useSession();
  const [addComment] = useMutation(ADD_COMMENTS, {
    refetchQueries: [GET_ALL_POSTS_BY_ID, 'getPostListById']
  });
  const { data, error } = useQuery(GET_ALL_POSTS_BY_ID, {
    variables: {
      post_id: router.query.postId,
    },
  });

  const post: Post = data?.getPostListById;


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);

    const notification = toast.loading("Posting your comment...");
    await addComment({
      variables: {
        post_id: router.query.postId,
        username: session?.user?.name,
        text: data.comment,
      },
    });

    setValue("comment", " ");

    toast.success("Comment Successfuly Posted!", {
      id: notification,
    });
  };

  return (
    <div className="mx-auto my-7 max-x-5xl">
      <Post post={post} />

      <div className="-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as <span className="text-red-500">{session?.user?.name}</span>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  flex-col space-y-2"
        >
          <textarea
            {...register("comment")}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4
                        outline-none disabled:bg-gray-50"
            placeholder={
              session ? "What are you thoughts?" : "Please sign in to comment"
            }
            disabled={!session}
          />

          <button
            type="submit"
            className="rounded-full text-white bg-red-500 p-3 font-semibold disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>

      <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />

        {post?.comments?.map((comment) => (
            <div className="relative flex items-center space-x-2 space-y-5" key={comment.id}>
              <hr className="absolute top-10 h-16 border left-7 z-0" />
              <div className="z-50">
                <Avatar seed={comment.username} />
              </div>

              <div className="flex flex-col">
                <p className="py-2 text-xs text-gray-400">
                  <span>{comment.username}</span>
                  {' '}
                  <TimeAgo date={comment.created_at} />
                </p>  

                <p>{comment.text}</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
