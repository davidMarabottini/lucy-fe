import { beforeEach, describe, expect, it, vi } from "vitest";

import { isNullable } from "./isNullable";
import { generateMockJWT, getDecodedToken } from './jwt';
import { calculatePerc } from "./numbers";
import { setRequiredField } from "./string";
import { buildSMTPString } from "./formatEmail";
import type { IMailFormData } from "@/types/contentsFormDatas.types";
import { parseEMLtoMailFormData } from "./mailParse";

describe('isNullable Utility Function', () => {
  it('testing on null validator', () => {
    expect(isNullable<null>(null)).toBe(true);
  });
  it('testing on undefined validator', () => {
    expect(isNullable<undefined>(undefined)).toBe(true);
  });
  it('testing on string validator', () => {
    expect(isNullable<string>('')).toBe(true);
    expect(isNullable<string | null>(null)).toBe(true);
    expect(isNullable<string | undefined>(undefined)).toBe(true);
    expect(isNullable<string>('not empty')).toBe(false);
  });
  it('testing on number validator', () => {
    expect(isNullable<number>(NaN)).toBe(true);
    expect(isNullable<number | null>(null)).toBe(true);
    expect(isNullable<number | undefined>(undefined)).toBe(true);
    expect(isNullable<number>(42)).toBe(false);
  });
  it('testing on boolean validator', () => {
    expect(isNullable<boolean | null>(null)).toBe(true);
    expect(isNullable<boolean | undefined>(undefined)).toBe(true);
    expect(isNullable<boolean>(true)).toBe(false);
    expect(isNullable<boolean>(false)).toBe(false);
  });
  it('testing on object validator', () => {
    expect(isNullable<null>(null)).toBe(true);
    expect(isNullable<undefined>(undefined)).toBe(true);
    expect(isNullable<object>({})).toBe(false);
    expect(isNullable<object>({ key: 'value' })).toBe(false);
    expect(isNullable<number[]>([])).toBe(true);
    expect(isNullable<number[]>([1, 2, 3])).toBe(false);
  });
  it('testing on unknown type validator', () => {
    expect(isNullable<symbol>(Symbol('test'))).toBe(false);
    expect(isNullable<bigint>(BigInt(10))).toBe(false);
  });
  it('testing on mixed type validator', () => {
    expect(isNullable<string | number>('')).toBe(true);
    expect(isNullable<string | number>(NaN)).toBe(true);
  });
});


describe('JWT Utilities', () => {
  it('should generate a valid mock JWT string format', () => {
    const token = generateMockJWT('john', 'editor');
    const parts = token.split('.');
    
    expect(parts).toHaveLength(3);
    expect(typeof token).toBe('string');
  });

  it('should decode a generated token correctly', () => {
    const user = 'test-user';
    const role = 'admin';
    const token = generateMockJWT(user, role);
    const decoded = getDecodedToken(token);

    expect(decoded).not.toBeNull();
    expect(decoded?.user).toBe(user);
    expect(decoded?.role).toBe(role);
    expect(decoded).toHaveProperty('exp');
    expect(decoded).toHaveProperty('iat');
  });

  it('should return null if token is not provided', () => {
    expect(getDecodedToken(null)).toBeNull();
    expect(getDecodedToken('')).toBeNull();
  });

  it('should return null and log error for invalid token format', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const invalidToken = "invalid.token.format";
    const result = getDecodedToken(invalidToken);

    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should handle malformed base64 strings', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const malformedToken = "header.NOT_BASE64_JSON.signature";
    const result = getDecodedToken(malformedToken);

    expect(result).toBeNull();
    
    consoleSpy.mockRestore();
  });
});

describe("calculatePerc utility", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it.each([
    { value: 0, result: 0 },
    { value: 0.5, result: 50 },
    { value: 1, result: 100 }
  ])('should return $result when value is $value (no warning)', ({ value, result }) => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(calculatePerc(value)).toBe(result);
    expect(spy).not.toHaveBeenCalled();
  });

  it.each([
    { value: -1, result: 0 },
    { value: 1.01, result: 100 }
  ])('should return $result and warn when value is $value', ({ value, result }) => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(calculatePerc(value)).toBe(result);
    expect(spy).toHaveBeenCalledWith("your value is out of range");
  });

  it.each([
    { value: NaN, result: 0 },
  ])('should return 0 and warn when value is $value', ({ value, result }) => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(calculatePerc(value)).toBe(result);
    expect(spy).toHaveBeenCalledWith("your value is nullable");
  });
});

describe("setRequiredField", () => {
  it("should be with hasterisk", () => {
    const result = setRequiredField("test", true);
    expect(result).toBe("test *")
  })

  it("should be without hasterisk", () => {
    const result = setRequiredField("test", false);
    expect(result).toBe("test")
  })

  it("should be without hasterisk", () => {
    const result = setRequiredField("test");
    expect(result).toBe("test")
  })
})

describe('parseEMLtoMailFormData', () => {
  
  it('dovrebbe estrarre correttamente i dati da una mail standard con nome e indirizzo', () => {
    const rawEML = `From: "Mario Rossi" <mario.rossi@example.com>
To: destinario@test.it
Subject: Prova parsing
MIME-Version: 1.0

Ciao, questo è il corpo della mail.`;

    const result = parseEMLtoMailFormData(rawEML);

    expect(result.from_name).toBe("Mario Rossi");
    expect(result.from_mail).toBe("mario.rossi@example.com");
    expect(result.to).toBe("destinario@test.it");
    expect(result.subject).toBe("Prova parsing");
    expect(result.body_text).toContain("Ciao, questo è il corpo della mail.");
    expect(result.is_html).toBe(false);
  });

  it('dovrebbe gestire il mittente quando manca il nome visualizzato', () => {
    const rawEML = `From: <solo.mail@test.com>
Subject: Senza Nome

Corpo mail.`;

    const result = parseEMLtoMailFormData(rawEML);

    expect(result.from_name).toBe("");
    expect(result.from_mail).toBe("solo.mail@test.com");
  });

  it('dovrebbe identificare correttamente il contenuto HTML', () => {
    const rawEML = `From: test@test.it
Subject: Mail HTML

<html><body><h1>Titolo</h1></body></html>`;

    const result = parseEMLtoMailFormData(rawEML);

    expect(result.is_html).toBe(true);
    expect(result.body_text).toContain("<h1>Titolo</h1>");
  });

  it('dovrebbe gestire gli header multi-linea (folding)', () => {
    const rawEML = `From: test@test.it
Subject: Oggetto molto lungo 
 che continua sulla riga dopo

Corpo mail.`;

    const result = parseEMLtoMailFormData(rawEML);

    expect(result.subject).toBe("Oggetto molto lungo che continua sulla riga dopo");
  });

  it('dovrebbe restituire campi vuoti se gli header mancano', () => {
    const rawEML = `

Solo corpo senza nulla.`;

    const result = parseEMLtoMailFormData(rawEML);

    expect(result.from_mail).toBe("");
    expect(result.subject).toBe("");
    expect(result.body_text.trim()).toBe("Solo corpo senza nulla.");
  });
});

describe('formatEmails', () => {
  const mockMailDataHTML: IMailFormData = {
    from_name: "David Developer",
    from_mail: "david@example.com",
    to: "target@test.com",
    subject: "Test Logico SMTP",
    body_text: "<h1>Ciao</h1><p>Questa è una prova.</p>",
    is_html: true,
  };

    const mockMailDataNoHTML: IMailFormData = {
    from_name: "David Developer",
    from_mail: "david@example.com",
    to: "target@test.com",
    subject: "Test Logico SMTP",
    body_text: "Questa è una prova",
    is_html: false,
  };
  it('should correctly format main headers', () => {
    const result = buildSMTPString(mockMailDataHTML);
    
    expect(result).toContain(`From: "David Developer" <david@example.com>`);
    expect(result).toContain(`To: target@test.com`);
    expect(result).toContain(`Subject: Test Logico SMTP`);
    expect(result).toContain(`MIME-Version: 1.0`);
  });

  it('should use text/html when is_html is true', () => {
    const result = buildSMTPString(mockMailDataHTML);
    
    expect(result).toContain('Content-Type: text/html;');
    expect(result).not.toContain('Content-Type: text/plain;');
    expect(result).toContain(mockMailDataHTML.body_text);
  });

  it('should use text/plain when is_html is false', () => {
    const result = buildSMTPString(mockMailDataNoHTML);
    
    expect(result).toContain('Content-Type: text/plain;');
    expect(result).not.toContain('Content-Type: text/html;');
  });

  it('should generate and use a consistent boundary', () => {
    const result = buildSMTPString(mockMailDataHTML);
    
    const boundaryMatch = result.match(/boundary="([^"]+)"/);
    const boundary = boundaryMatch ? boundaryMatch[1] : null;

    expect(boundary).not.toBeNull();
  });
})