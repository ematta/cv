import { renderToBuffer } from "@react-pdf/renderer";
import ResumeDocument from "@/components/resume-pdf/ResumeDocument";
import { resume } from "@/data/resume";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const pdf = await renderToBuffer(
    <ResumeDocument resume={resume} maxHighlightsPerJob={4} />,
  );
  const body = new Uint8Array(pdf);

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Enrique-Matta-Rodriguez-Resume.pdf"',
    },
  });
}
