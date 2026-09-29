export type TimelineCategory =
  | "Education"
  | "Teaching"
  | "Paper"
  | "Project"
  | "Credential"

export interface TimelineLink {
  label: string
  href: string
}

export interface TimelineItem {
  id: string
  /** ISO-ish sortable date, e.g. "2014-05" */
  date: string
  /** Human readable date or range, e.g. "May 2014" or "2018 – 2020" */
  dateLabel: string
  title: string
  category: TimelineCategory
  discipline?: string
  description: string
  image: string
  imageAlt: string
  /** Longer body shown in the expanded detail view. Each string is a paragraph. */
  details: string[]
  links?: TimelineLink[]
}

/**
 * The intellectual timeline.
 *
 * This is the single source of truth for the archive. Add, remove, reorder,
 * or edit entries here — the timeline, tiles, and detail views all read from
 * this array. Items are sorted chronologically by `date` at render time.
 *
 * NOTE: All content below is clearly-marked PLACEHOLDER material. Replace the
 * text, dates, links, and artifact images (in /public/artifacts) with real
 * scholarship when it is available.
 */
export const timelineItems: TimelineItem[] = [
  {
    id: "undergraduate-thesis",
    date: "2014-05",
    dateLabel: "Spring 2014",
    title: "Undergraduate Thesis — [Placeholder Title]",
    category: "Paper",
    discipline: "Philosophy",
    description:
      "A first sustained argument, written across a single winter, on the question that would organize the years that followed.",
    image: "/artifacts/undergraduate-thesis.png",
    imageAlt: "Typewritten thesis title page on aged cream paper",
    details: [
      "PLACEHOLDER — Describe the central question of the thesis, the method you used, and what surprised you while writing it. This is where the intellectual origin of your work is introduced.",
      "Note the advisor, the department, and any recognition the work received. Keep the voice reflective rather than promotional.",
    ],
    links: [{ label: "Read the abstract", href: "#" }],
  },
  {
    id: "ba-degree",
    date: "2014-06",
    dateLabel: "June 2014",
    title: "Bachelor of Arts, Honours — [Institution]",
    category: "Credential",
    discipline: "Philosophy & History of Ideas",
    description:
      "Conferred with honours. The end of an undergraduate education and the beginning of a scholarly one.",
    image: "/artifacts/degree-certificate.png",
    imageAlt: "Formal diploma certificate with an embossed seal on parchment",
    details: [
      "PLACEHOLDER — Institution, degree classification, and areas of concentration. Mention any prizes, scholarships, or societies.",
      "A sentence or two on the teachers or courses that shaped your direction.",
    ],
  },
  {
    id: "first-conference-paper",
    date: "2017-03",
    dateLabel: "March 2017",
    title: "First Conference Paper — [Conference Name]",
    category: "Paper",
    discipline: "Epistemology",
    description:
      "A nervous first delivery before peers, annotated in pencil the night before and revised in the margins during the session.",
    image: "/artifacts/conference-paper.png",
    imageAlt: "Stapled conference paper with pencil annotations in the margin",
    details: [
      "PLACEHOLDER — Summarize the argument and the reception it met. What did the questions from the audience change in your thinking?",
      "Include the panel, the city, and any collaborators.",
    ],
    links: [{ label: "Slides", href: "#" }],
  },
  {
    id: "teaching-assistantship",
    date: "2018-09",
    dateLabel: "2018 – 2020",
    title: "Graduate Teaching Assistant — Introduction to [Field]",
    category: "Teaching",
    discipline: "Pedagogy",
    description:
      "Two years leading seminar sections and learning that teaching is itself a form of thinking.",
    image: "/artifacts/teaching-assistantship.png",
    imageAlt: "Vintage classroom chalkboard with faint erased marks",
    details: [
      "PLACEHOLDER — Describe the courses, the number of students, and the pedagogical approach you developed. What did you learn about explaining difficult ideas simply?",
      "Note any teaching evaluations, mentorship, or curricular contributions.",
    ],
  },
  {
    id: "journal-article",
    date: "2019-11",
    dateLabel: "November 2019",
    title: "Peer-Reviewed Article — [Journal]",
    category: "Paper",
    discipline: "Philosophy of Mind",
    description:
      "A first peer-reviewed publication, three rounds of revision, and a considerably better argument for it.",
    image: "/artifacts/journal-article.png",
    imageAlt: "Open scholarly journal showing columns of text and a diagram",
    details: [
      "PLACEHOLDER — The thesis of the article, the journal, and its place in the wider conversation. Cite volume and issue when known.",
      "A note on what the reviewers pushed you to reconsider.",
    ],
    links: [
      { label: "DOI", href: "#" },
      { label: "Preprint (PDF)", href: "#" },
    ],
  },
  {
    id: "graduate-seminar",
    date: "2020-01",
    dateLabel: "2020",
    title: "Master of Arts — [Institution]",
    category: "Education",
    discipline: "History & Philosophy of Science",
    description:
      "Coursework, close reading, and a long apprenticeship in the seminar room.",
    image: "/artifacts/graduate-seminar.png",
    imageAlt: "Stack of worn hardcover scholarly books with faded spines",
    details: [
      "PLACEHOLDER — Program, focus, and the seminars that mattered most. Mention your qualifying fields.",
      "The reading that changed how you work.",
    ],
  },
  {
    id: "course-syllabus",
    date: "2021-08",
    dateLabel: "Autumn 2021",
    title: "Designed & Taught — [Course Title]",
    category: "Teaching",
    discipline: "Curriculum Design",
    description:
      "An original undergraduate course, built from a blank page: readings, assignments, and a fourteen-week argument.",
    image: "/artifacts/course-syllabus.png",
    imageAlt: "Printed course syllabus with a weekly schedule grid",
    details: [
      "PLACEHOLDER — The course's guiding question, its structure, and the assessments you designed. How did students respond?",
      "Link the syllabus and describe any materials you would reuse.",
    ],
    links: [{ label: "Syllabus (PDF)", href: "#" }],
  },
  {
    id: "book-chapter",
    date: "2022-06",
    dateLabel: "2022",
    title: "Book Chapter — [Edited Volume]",
    category: "Project",
    discipline: "Intellectual History",
    description:
      "An invited contribution to an edited collection, and a first attempt at writing for a book rather than a journal.",
    image: "/artifacts/book-chapter.png",
    imageAlt: "Minimal ochre cloth hardcover monograph on a neutral surface",
    details: [
      "PLACEHOLDER — The volume, the editors, and your chapter's contribution. How did writing at length change the argument?",
    ],
    links: [{ label: "Publisher", href: "#" }],
  },
  {
    id: "digital-humanities",
    date: "2023-04",
    dateLabel: "2023 – present",
    title: "Ongoing Project — [Digital Archive / Method]",
    category: "Project",
    discipline: "Digital Humanities",
    description:
      "A living project mapping a network of ideas and correspondents — part research, part public scholarship.",
    image: "/artifacts/digital-humanities.png",
    imageAlt: "Hand-drawn ink network diagram of nodes and connecting lines",
    details: [
      "PLACEHOLDER — The aims of the project, the methods and tools, and its intended audience. Describe what it makes newly visible.",
      "Note collaborators, funding, and where the work can be followed.",
    ],
    links: [
      { label: "Project site", href: "#" },
      { label: "GitHub", href: "#" },
    ],
  },
  {
    id: "doctoral-dissertation",
    date: "2024-09",
    dateLabel: "September 2024",
    title: "Doctoral Dissertation — [Placeholder Title]",
    category: "Paper",
    discipline: "Philosophy",
    description:
      "The culmination of a decade of questions, defended and bound — and the ground for what comes next.",
    image: "/artifacts/doctoral-dissertation.png",
    imageAlt: "Thick bound doctoral dissertation with a gold-lettered spine",
    details: [
      "PLACEHOLDER — The dissertation's argument in a few sentences, the committee, and the contribution it makes. What is the next question it opens?",
    ],
    links: [{ label: "Abstract", href: "#" }],
  },
]

export const categories: TimelineCategory[] = [
  "Education",
  "Teaching",
  "Paper",
  "Project",
  "Credential",
]
