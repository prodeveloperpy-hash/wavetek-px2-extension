const DEFAULT_TIMEOUT_MS = 10000;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== "PX2_REQUEST") return false;
  performRequest(message.request)
    .then((result) => sendResponse({ ok: true, ...result }))
    .catch((error) => sendResponse({ ok: false, error: error.message }));
  return true;
});

async function performRequest(request) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), request.timeoutMs || DEFAULT_TIMEOUT_MS);
  try {
    const response = await fetch(request.url, {
      method: request.method || "GET",
      headers: request.headers || {},
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
      credentials: request.credentials || "include",
      redirect: "follow",
      signal: controller.signal
    });
    const text = await response.text();
    return {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      body: text.slice(0, 20000)
    };
  } catch (error) {
    if (error.name === "AbortError") throw new Error("PX2 request timed out.");
    throw new Error(error.message || "PX2 request failed.");
  } finally {
    clearTimeout(timeout);
  }
}
