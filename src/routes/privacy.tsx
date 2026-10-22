import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Student Career Hub" },
      {
        name: "description",
        content: "How Student Career Hub collects, uses and protects information when you browse the company directory.",
      },
      { property: "og:title", content: "Privacy Policy | Student Career Hub" },
      {
        property: "og:description",
        content: "How Student Career Hub handles information when you run a corporate audit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS: LegalSection[] = [
  {
    heading: "Information we collect",
    body: [
      "Student Career Hub is a read only employer intelligence platform. You do not need an account to browse it, and we do not ask you for personal details such as your name, email address or ID number.",
      "When you use the service, limited technical information may be processed automatically:",
      [
        "Basic request data such as browser type, device type, and the pages you visit.",
        "Search terms you type into the directory, which are processed in your browser to filter results.",
        "Error reports that help us find and fix problems with the site.",
      ],
    ],
  },
  {
    heading: "How we use information",
    body: [
      "We use the information described above only to operate, secure and improve the directory. Specifically, we use it to:",
      [
        "Deliver pages and company profiles to your device.",
        "Understand which features are useful so we can improve them.",
        "Detect, investigate and prevent errors, abuse and security incidents.",
      ],
      "We do not sell your information and we do not use it for targeted advertising.",
    ],
  },
  {
    heading: "Local storage",
    body: [
      "We store your light or dark theme preference in your browser's local storage so the site looks the way you chose on your next visit. This value never leaves your device and you can clear it at any time through your browser settings.",
    ],
  },
  {
    heading: "Company data",
    body: [
      "The company information shown in the directory, such as business details, compensation ranges and technologies, is compiled from public sources. It describes organisations, not individual job seekers.",
      "Where a profile names an individual, such as a chief executive, that information is limited to what is already publicly available in a professional capacity.",
    ],
  },
  {
    heading: "Sharing with third parties",
    body: [
      "We rely on trusted infrastructure providers to host the site and store directory data. These providers process information only on our behalf and under obligations of confidentiality.",
      "We may disclose information if required by law, or to protect the rights, safety and security of our users and the service.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "Technical logs are kept only for as long as needed for the purposes described in this policy, after which they are deleted or anonymised.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We use reasonable technical and organisational measures to protect information against unauthorised access, loss or misuse. No online service can be guaranteed to be completely secure, but we work to keep risks low.",
    ],
  },
  {
    heading: "Your choices and rights",
    body: [
      "Depending on where you live, you may have the right to access, correct or delete information about you, or to object to certain processing. Because we do not collect account details, most information we hold cannot be linked back to you personally.",
      "If you believe a company profile contains inaccurate information about you, please contact the Student Career Hub team so it can be reviewed.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time. When we do, we will revise the date at the top of this page. Continued use of the directory after an update means you accept the revised policy.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Questions about this policy or about how information is handled can be directed to the Student Career Hub team.",
    ],
  },
];

function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="October 19, 2026"
      intro="This policy explains what information Student Career Hub processes when you browse the company directory, why we process it, and the choices you have."
      sections={SECTIONS}
    />
  );
}
