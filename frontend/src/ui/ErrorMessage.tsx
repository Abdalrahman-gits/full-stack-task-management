function ErrorMessage({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="border-presence-busy/30 bg-presence-busy/10 text-presence-busy rounded-lg border px-4 py-3 text-sm"
    >
      {message}
    </p>
  );
}

export default ErrorMessage;
