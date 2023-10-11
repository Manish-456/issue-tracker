"use client";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { TextField, Button, Callout } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface IssueForm {
  title: string;
  description: string;
}

export function CreateIssueForm() {
  const [error, setError] = React.useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<IssueForm>();

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input
            {...register("title")}
            disabled={isSubmitting}
            placeholder="Title"
          />
        </TextField.Root>
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
        <Button disabled={isSubmitting} type="submit">
          Submit New Issue
        </Button>
      </form>
    </div>
  );
}
