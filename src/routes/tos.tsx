import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/tos")({
  head: () => ({
    meta: [
      { title: "Terms of Service | CorporateDNA" },
      {
        name: "description",
        content: "The terms that apply when you use CorporateDNA, the employer intelligence platform.",
      },
      { property: "og:title", content: "Terms of Service | CorporateDNA" },
      {
        property: "og:description",
        content: "The rules and conditions for using CorporateDNA corporate audits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsPage,
});

const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    body: [
      "By accessing or using CorporateDNA, you agree to these Terms of Service. If you do not agree, please do not use the directory.",
    ],
  },
  {
    heading: "Who may use the service",
    body: [
      "CorporateDNA is intended for job seekers, career changers and anyone researching potential employers for personal, non commercial purposes.",
    ],
  },
  {
    heading: "Use of the directory",
    body: [
      "You may browse, search and read company profiles for your own career research. You may share links to individual pages.",
      "You agree not to:",
      [
        "Copy, scrape or bulk download directory data by automated means.",
        "Republish or sell directory content without written permission.",
        "Attempt to disrupt, overload or gain unauthorised access to the service or its infrastructure.",
        "Use the directory to harass, mislead or misrepresent any company or person.",
      ],
    ],
  },
  {
    heading: "Accuracy of information",
    body: [
      "Company information is compiled from public sources and is provided for general guidance only. Figures such as compensation, revenue and headcount can change without notice.",
      "We make reasonable efforts to keep profiles current, but we do not guarantee that any information is complete, accurate or up to date. Always confirm important details directly with the company before making decisions.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The design, layout and original text of CorporateDNA are protected by applicable intellectual property laws. Company names and logos belong to their respective owners and are shown for identification only. Their display does not imply endorsement.",
    ],
  },
  {
    heading: "Third party links",
    body: [
      "Profiles may link to external websites, such as company careers pages. We are not responsible for the content, policies or practices of those sites, and visiting them is at your own risk.",
    ],
  },
  {
    heading: "Disclaimer of warranties",
    body: [
      "The service is provided on an \"as is\" and \"as available\" basis, without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose and non infringement.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, CorporateDNA and its operators will not be liable for any indirect, incidental, special or consequential damages, or for any loss arising from your reliance on information in the directory.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may revise these terms from time to time. The updated version will be posted on this page with a new date. Continued use of the service after changes take effect means you accept the revised terms.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Questions about these terms can be directed to the CorporateDNA team.",
    ],
  },
];

function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="October 19, 2026"
      intro="These terms describe how you may use CorporateDNA, what you can expect from us, and the limits of the information we provide."
      sections={SECTIONS}
    />
  );
}
