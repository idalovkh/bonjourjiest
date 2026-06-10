import { describe, expect, it } from "vitest";
import { normalizeTelegramProxyUrl } from "./telegram-proxy.ts";

describe("normalizeTelegramProxyUrl", () => {
  it("converts host:port:user:pass to http URL", () => {
    expect(normalizeTelegramProxyUrl("185.128.41.106:63764:zmBrtTzb:5cDX7d69")).toBe(
      "http://zmBrtTzb:5cDX7d69@185.128.41.106:63764"
    );
  });

  it("keeps full http URL", () => {
    expect(normalizeTelegramProxyUrl("http://user:pass@1.2.3.4:8080")).toBe(
      "http://user:pass@1.2.3.4:8080"
    );
  });

  it("keeps socks5 URL", () => {
    expect(normalizeTelegramProxyUrl("socks5://user:pass@1.2.3.4:1080")).toBe(
      "socks5://user:pass@1.2.3.4:1080"
    );
  });

  it("adds http scheme to user:pass@host:port", () => {
    expect(normalizeTelegramProxyUrl("user:pass@1.2.3.4:8080")).toBe("http://user:pass@1.2.3.4:8080");
  });
});
