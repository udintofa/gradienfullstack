"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import {
  createQuestionAction,
  updateQuestionAction,
  deleteQuestionAction,
} from "@/actions/question";

import { ArrowLeft } from "lucide-react";

type Option = {
  id: number;
  text: string;
  is_correct: boolean;
};

type Question = {
  id: number;
  text: string;
  explanation: string | null;
  video: string | null;
  options: Option[];
};

type Props = {
  subtryoutId: number;
  initialQuestions: Question[];
};

export default function MentorSubtryoutClient({
  subtryoutId,
  initialQuestions,
}: Props) {
  const router = useRouter();

  const [questions] = useState(initialQuestions);

  async function handleAddQuestion() {
    const { value } = await Swal.fire({
      title: "Add Question",
      width: 600,
      html: `
      <div style="text-align:left;font-size:14px">

        <div style="margin-bottom:10px">
          <label style="font-weight:600">Question</label>
          <textarea id="text" class="swal2-textarea"></textarea>
        </div>

        <div style="margin-bottom:10px">
          <label style="font-weight:600">Explanation</label>
          <textarea id="explanation" class="swal2-textarea"></textarea>
        </div>

        <div style="margin-bottom:16px">
          <label style="font-weight:600">Video URL</label>
          <input id="video" class="swal2-input">
        </div>

        <hr style="margin:12px 0"/>

        <div style="font-weight:600;margin-bottom:6px">
          Answer Options
        </div>

        <input id="opt1" class="swal2-input" placeholder="Option 1">
        <input id="opt2" class="swal2-input" placeholder="Option 2">
        <input id="opt3" class="swal2-input" placeholder="Option 3">
        <input id="opt4" class="swal2-input" placeholder="Option 4">

        <div style="margin-top:12px">
          <select id="correct" class="swal2-input">
            <option value="">Correct Answer</option>
            <option value="0">Option 1</option>
            <option value="1">Option 2</option>
            <option value="2">Option 3</option>
            <option value="3">Option 4</option>
          </select>
        </div>

      </div>
      `,
      showCancelButton: true,

      preConfirm: () => {
        const popup = Swal.getPopup()!;

        const text = (
          popup.querySelector("#text") as HTMLTextAreaElement
        ).value.trim();

        const explanation = (
          popup.querySelector("#explanation") as HTMLTextAreaElement
        ).value.trim();

        const videoUrl = (
          popup.querySelector("#video") as HTMLInputElement
        ).value.trim();

        const options = [
          (popup.querySelector("#opt1") as HTMLInputElement).value.trim(),
          (popup.querySelector("#opt2") as HTMLInputElement).value.trim(),
          (popup.querySelector("#opt3") as HTMLInputElement).value.trim(),
          (popup.querySelector("#opt4") as HTMLInputElement).value.trim(),
        ];

        const correct = Number(
          (popup.querySelector("#correct") as HTMLSelectElement).value,
        );

        if (!text || options.some((o) => !o) || Number.isNaN(correct)) {
          Swal.showValidationMessage("Semua field wajib diisi");
          return;
        }

        return {
          text,
          explanation,
          videoUrl,
          options: options.map((o, i) => ({
            text: o,
            isCorrect: i === correct,
          })),
        };
      },
    });

    if (!value) return;

    await createQuestionAction(subtryoutId, value);

    router.refresh();
  }

  async function handleEditQuestion(question: Question) {
    const correctIndex = question.options.findIndex((o) => o.is_correct);

    const { value } = await Swal.fire({
      title: "Edit Question",
      width: 600,

      html: `
      <textarea id="text" class="swal2-textarea">${question.text}</textarea>

      <textarea id="explanation"
      class="swal2-textarea">${question.explanation ?? ""}</textarea>

      <input id="video"
      class="swal2-input"
      value="${question.video ?? ""}">

      <hr>

      <input id="opt1" class="swal2-input"
      value="${question.options[0]?.text ?? ""}">

      <input id="opt2" class="swal2-input"
      value="${question.options[1]?.text ?? ""}">

      <input id="opt3" class="swal2-input"
      value="${question.options[2]?.text ?? ""}">

      <input id="opt4" class="swal2-input"
      value="${question.options[3]?.text ?? ""}">

      <select id="correct" class="swal2-input">
        <option value="0" ${correctIndex === 0 ? "selected" : ""}>Option 1</option>
        <option value="1" ${correctIndex === 1 ? "selected" : ""}>Option 2</option>
        <option value="2" ${correctIndex === 2 ? "selected" : ""}>Option 3</option>
        <option value="3" ${correctIndex === 3 ? "selected" : ""}>Option 4</option>
      </select>
      `,
      showCancelButton: true,

      preConfirm: () => {
        const popup = Swal.getPopup()!;

        const options = [
          (popup.querySelector("#opt1") as HTMLInputElement).value.trim(),
          (popup.querySelector("#opt2") as HTMLInputElement).value.trim(),
          (popup.querySelector("#opt3") as HTMLInputElement).value.trim(),
          (popup.querySelector("#opt4") as HTMLInputElement).value.trim(),
        ];

        const correct = Number(
          (popup.querySelector("#correct") as HTMLSelectElement).value,
        );

        return {
          text: (popup.querySelector("#text") as HTMLTextAreaElement).value,

          explanation: (
            popup.querySelector("#explanation") as HTMLTextAreaElement
          ).value,

          videoUrl: (popup.querySelector("#video") as HTMLInputElement).value,

          options: options.map((o, i) => ({
            text: o,
            isCorrect: i === correct,
          })),
        };
      },
    });

    if (!value) return;

    await updateQuestionAction(question.id, value);

    router.refresh();
  }

  async function handleDeleteQuestion(id: number) {
    const result = await Swal.fire({
      title: "Delete Question?",
      icon: "warning",
      showCancelButton: true,
    });

    if (!result.isConfirmed) return;

    await deleteQuestionAction(id);

    router.refresh();
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Questions</h1>

      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-indigo-600 font-medium hover:underline"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <button
        onClick={handleAddQuestion}
        className="mb-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        + Add Question
      </button>

      <div className="space-y-5">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <h3 className="mb-4 text-lg font-semibold">Question {index + 1}</h3>

            <p className="mb-5">{q.text}</p>

            <div className="space-y-2">
              {q.options.map((opt) => (
                <div
                  key={opt.id}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 ${
                    opt.is_correct
                      ? "border-green-300 bg-green-100"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <span>{opt.text}</span>

                  {opt.is_correct && (
                    <span className="font-semibold text-green-600">
                      ✓ Correct Answer
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => handleEditQuestion(q)}
                className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteQuestion(q.id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
