import ThemedResume from "@/components/ThemedResume";
import { resume } from "@/data/resume";

export default function ThemedPage() {
  return <ThemedResume resume={resume} />;
}
