"use client";
import axios from "axios";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout } from '@radix-ui/themes';
import { AiOutlineInfoCircle } from "react-icons/ai";
import { createIssueSchema } from "@/app/validators/issue-validator-schema";
import { ErrorMessage } from "@/app/_components/error-message";
import { Spinner } from "@/app/_components/spinner";

type IssueForm = z.infer<typeof createIssueSchema>

export function CreateIssueForm() {
  const [error, setError] = React.useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<IssueForm>({
    resolver : zodResolver(createIssueSchema)
  });

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      await axios.post(`/api/issues`, data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occured.");
    }
  };

  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <TextField.Root>
          <TextField.Input
            {...register("title")}
            disabled={isSubmitting}
            placeholder="Title"
          />
        </TextField.Root>
       <ErrorMessage>
            {errors.title?.message}
            </ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              aria-disabled={isSubmitting}
              placeholder="Description"
            />
          )}
        />
      <ErrorMessage  >
            {errors.description?.message}
            </ErrorMessage>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? <Spinner /> : "Submit New Issue"}
        </Button>
      </form>
    </div>
  );
}
