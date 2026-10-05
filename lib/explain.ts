export const CHANNEL = "https://www.youtube.com/@Nazux-n5e";

export type ExplainerAction = {
  label: string;
  href: string;
};

export type Explainer = {
  id: string;
  title: string;
  choice: string;
  keys: string[];
  answer: string;
  action?: ExplainerAction;
};

export type Plan = {
  steps: string[];
  answer: string;
  action: ExplainerAction | null;
  navigate: boolean;
};

export const explainers: Explainer[] = [
  {
    id: "about",
    title: "What Nazux is",
    choice: "what Nazux is",
    keys: ["nazux", "who are you", "what is this", "what are you", "about you"],
    answer:
      "Nazux gives plain explainers for remote workers who want a calmer home office. Ask for one, or watch them on YouTube.",
  },
  {
    id: "watch",
    title: "YouTube channel",
    choice: "the YouTube channel",
    keys: ["youtube", "channel", "video", "watch"],
    answer: "The explainers are on the Nazux YouTube channel.",
    action: { label: "Open the channel", href: CHANNEL },
  },
  {
    id: "reset",
    title: "Sunday reset",
    choice: "the Sunday reset",
    keys: ["sunday", "reset", "next week", "monday"],
    answer:
      "Close one week before you start the next. Clear the desk, write down the three things that matter, and leave Monday a smaller pile.",
  },
  {
    id: "desk",
    title: "Quieter desk",
    choice: "the quieter desk",
    keys: ["desk", "chair", "workspace", "setup", "clutter"],
    answer:
      "Keep the desk for the task in front of you. Everything else goes where you can reach it without searching. If you can reset the surface in a minute, it is quiet enough.",
  },
  {
    id: "shutdown",
    title: "End the day",
    choice: "the end of the day",
    keys: [
      "end the day",
      "shutdown",
      "log off",
      "sign off",
      "evening",
      "done for the day",
      "work day",
    ],
    answer:
      "Stop on purpose. Note where you left off, close the extra tabs, and choose the first thing for tomorrow. Then leave the work where it is.",
  },
  {
    id: "focus",
    title: "A short focus block",
    choice: "a short focus block",
    keys: ["focus", "distract", "notification", "deep work", "concentrate"],
    answer:
      "Choose one task and quiet the rest for a short block. When the block ends, stand up. The calm is in the stopping, not in a longer day.",
  },
];

function score(question: string, keys: string[]) {
  return keys.reduce(
    (total, key) => total + (question.includes(key) ? key.length : 0),
    0,
  );
}

function choose(question: string) {
  let best: Explainer | null = null;
  let bestScore = 0;
  for (const explainer of explainers) {
    const value = score(question, explainer.keys);
    if (value > bestScore) {
      best = explainer;
      bestScore = value;
    }
  }
  return best;
}

function wantsNavigation(question: string) {
  return /\b(open|go to|take me)\b/.test(question);
}

export function plan(question: string): Plan {
  const normalized = question.trim().toLowerCase();
  if (!normalized) {
    return {
      steps: [
        "The request was empty.",
        "Nazux needs a subject before it can explain.",
      ],
      answer:
        "Ask for a Sunday reset, a quieter desk, a short focus block, or how to end the work day.",
      action: null,
      navigate: false,
    };
  }

  const explainer = choose(normalized);
  if (!explainer) {
    return {
      steps: [
        "Read the request.",
        "No Nazux explainer matches it.",
        "Stay with the subjects Nazux actually covers.",
      ],
      answer:
        "I stick to a few explainers: a Sunday reset, a quieter desk, a short focus block, and ending the work day. Ask for one of those, or open the channel.",
      action: { label: "Open the channel", href: CHANNEL },
      navigate: false,
    };
  }

  const action = explainer.action ?? null;
  const steps = ["Read the request.", `Picked ${explainer.choice}.`];
  if (action && wantsNavigation(normalized)) {
    steps.push("Open the channel.");
  } else {
    steps.push("Answer in plain language.");
  }

  return {
    steps,
    answer: explainer.answer,
    action,
    navigate: Boolean(action && wantsNavigation(normalized)),
  };
}
