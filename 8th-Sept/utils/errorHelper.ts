export function contextualError(testCaseId: string, action: string, message: string): Error {
  return new Error(`[${testCaseId}] ${action}: ${message}`);
}
