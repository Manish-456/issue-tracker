import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required"
  }).max(256),
  description: z.string().min(1, {
    message: "Description is required"
  })
});
