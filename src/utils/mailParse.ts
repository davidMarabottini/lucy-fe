import type { IMailFormData } from "@/types/contentsFormDatas.types";

export function parseEMLtoMailFormData(raw: string): IMailFormData {
  const lines = raw.split(/\r?\n/);

  const headers: Record<string, string> = {};
  let bodyStarted = false;
  const bodyLines: string[] = [];

  let lastHeaderKey: string | null = null;

  for (const line of lines) {
    if (!bodyStarted) {
      if (line.trim() === "") {
        bodyStarted = true;
        continue;
      }

      if (/^\s/.test(line) && lastHeaderKey) {
        headers[lastHeaderKey] += " " + line.trim();
        continue;
      }

      const match = line.match(/^([\w-]+):\s*(.*)$/);
      if (match) {
        const key = match[1].toLowerCase();

        if (!(key in headers)) {
          headers[key] = match[2].trim();
        }
        lastHeaderKey = key;
      }
    } else {
      bodyLines.push(line);
    }
  }

  let from_name = "";
  let from_mail = "";
  if (headers["from"]) {
    const fromMatch = headers["from"].match(/^(?:"?([^"]*)"?\s)?<([\w.+-]+@[\w.-]+)>$/);
    if (fromMatch) {
      from_name = fromMatch[1] || "";
      from_mail = fromMatch[2];
    } else {
      from_mail = headers["from"];
    }
  }

  const to = headers["to"] || "";

  const subject = headers["subject"] || "";

  const body_text = bodyLines.join("\n");
  const is_html = /<html[\s>]/i.test(body_text);

  return {
    from_name,
    from_mail,
    to,
    subject,
    body_text,
    is_html,
  };
}
