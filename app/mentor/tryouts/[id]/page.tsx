import { notFound } from "next/navigation";

import MentorTryoutClient from "./MentorTryoutClient";

import { getTryoutById } from "@/services/tryout.service";
import { getSubtryoutsByTryout } from "@/services/subtryout.service";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MentorTryoutPage({ params }: Props) {
  const { id } = await params;

  const tryoutId = Number(id);

  if (Number.isNaN(tryoutId)) {
    notFound();
  }

  const tryout = await getTryoutById(tryoutId);

  if (!tryout) {
    notFound();
  }

  const subtryouts = await getSubtryoutsByTryout(tryoutId);

  const sortedSubtryouts = [...subtryouts].sort(
    (a, b) => a.order_number - b.order_number,
  );

  return (
    <MentorTryoutClient
      tryoutId={tryoutId}
      tryout={tryout}
      initialSubtryouts={sortedSubtryouts}
    />
  );
}
