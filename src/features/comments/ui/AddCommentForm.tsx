import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import { useAppDispatch } from "../../../app/store/hooks";
import { commentsActions } from "../commentsSlice";
import { createId } from "../../../shared/utils/id";
import "./AddCommentForm.css";

const schema = z.object({
  author: z
    .string()
    .trim()
    .min(1, "Author is required")
    .max(30, "Author must be at most 30 chars"),
  text: z
    .string()
    .trim()
    .min(1, "Comment is required")
    .max(400, "Comment must be at most 400 chars"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  vehicleId: number;
};

export function AddCommentForm({ vehicleId }: Props) {
  const dispatch = useAppDispatch();

  const defaultValues = useMemo<FormValues>(
    () => ({
      author: "",
      text: "",
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const textValue = watch("text");

  const onSubmit = handleSubmit(async (values) => {
    dispatch(
      commentsActions.addComment({
        vehicleId,
        comment: {
          id: createId(),
          author: values.author.trim(),
          text: values.text.trim(),
          createdAt: new Date().toISOString(),
        },
      }),
    );

    reset(defaultValues);
  });

  return (
    <section className="add-comment-form">
      <h3 className="add-comment-form__title">Add a comment</h3>

      <form onSubmit={onSubmit} className="add-comment-form__form" noValidate>
        <label className="add-comment-form__field">
          <span className="add-add-comment-form__label">Author</span>
          <input
            {...register("author")}
            maxLength={30}
            placeholder="Your name"
            className={clsx(
              errors.author && "add-comment-form__control--invalid",
            )}
          />
          {errors.author && (
            <span className="add-comment-form__error">
              {errors.author.message}
            </span>
          )}
        </label>

        <label className="add-comment-form__field">
          <span className="add-add-comment-form__label">Comment</span>
          <textarea
            {...register("text")}
            maxLength={400}
            placeholder="Write your comment…"
            rows={4}
            className={clsx(
              "add-comment-form__control",
              "add-comment-form__control--textarea",
              errors.text && "add-comment-form__control--invalid",
            )}
          />
        </label>
        <div className="add-comment-form__meta-row">
          {errors.text ? (
            <span className="add-comment-form__error ">
              {errors.text.message}
            </span>
          ) : (
            <span />
          )}
        </div>

        <span className="add-comment-form__counter">
          {(textValue ?? "").length}/400
        </span>

        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="add-comment-form__submit"
        >
          {isSubmitting ? "Submitting…" : "Submit"}
        </button>
      </form>
    </section>
  );
}
