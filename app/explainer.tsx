"use client";

import { FormEvent, useRef, useState } from "react";
import { ExplainerAction, plan } from "@/lib/explain";

const suggestions = [
  { label: "Sunday reset", ask: "How do I do a Sunday reset?" },
  { label: "Quieter desk", ask: "How do I make my desk quieter?" },
  { label: "End the day", ask: "How should I end the work day?" },
  { label: "Watch", ask: "Open the YouTube channel" },
];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Explainer() {
  const [question, setQuestion] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [action, setAction] = useState<ExplainerAction | null>(null);
  const runId = useRef(0);

  async function run(nextQuestion: string) {
    const current = ++runId.current;
    const result = plan(nextQuestion);
    setSteps([]);
    setAnswer("");
    setAction(null);

    for (const step of result.steps) {
      await wait(280);
      if (current !== runId.current) return;
      setSteps((currentSteps) => [...currentSteps, step]);
    }

    await wait(280);
    if (current !== runId.current) return;
    setAnswer(result.answer);
    setAction(result.action);

    if (result.navigate && result.action) {
      await wait(700);
      if (current !== runId.current) return;
      window.location.assign(result.action.href);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void run(question);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="ask">Ask for an explainer</label>
        <div className="row">
          <input
            id="ask"
            name="ask"
            autoComplete="off"
            placeholder="Sunday reset, a quieter desk…"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
          <button type="submit">Ask</button>
        </div>
      </form>
      <div className="suggestions">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.label}
            type="button"
            onClick={() => {
              setQuestion(suggestion.ask);
              void run(suggestion.ask);
            }}
          >
            {suggestion.label}
          </button>
        ))}
      </div>
      <section className="agent" aria-live="polite">
        {steps.length > 0 ? (
          <ol className="steps">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        ) : null}
        {answer ? <p className="answer">{answer}</p> : null}
        {action ? (
          <p className="action">
            <a href={action.href}>{action.label}</a>
          </p>
        ) : null}
      </section>
    </>
  );
}
