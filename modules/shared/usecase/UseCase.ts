export interface UseCase<Request, Response> {
  execute(request: Request | "NONE"): Promise<Response> | Response;
}
