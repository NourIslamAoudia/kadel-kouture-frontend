import { supabase } from "@shared/lib/supabase";
import type { SubmissionInput } from "@features/submission/types";

export const submissionApi = {
  create: async (payload: SubmissionInput): Promise<void> => {
    const { error } = await supabase.from("submissions").insert(payload);

    if (error) throw new Error(error.message);
  },
};
