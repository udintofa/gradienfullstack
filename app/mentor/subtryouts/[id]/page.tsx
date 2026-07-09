import MentorSubtryoutClient from "./MentorSubtryoutClient";

import { getQuestionsBySubtryout } from "@/services/question.service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MentorSubtryoutPage({ params }: PageProps) {
  const { id } = await params;

  const questions = await getQuestionsBySubtryout(Number(id));

  return (
    <MentorSubtryoutClient
      subtryoutId={Number(id)}
      initialQuestions={questions}
    />
  );
}
