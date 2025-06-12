type MessageErrorInputProps = {
  message?: string
}

export function FormMessage({ message }: MessageErrorInputProps) {
  if (!message) return null

  return <p className="text-[0.8rem] font-bold text-red-500">{message}</p>
}
