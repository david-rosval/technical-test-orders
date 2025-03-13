import { Loader } from "lucide-react";

export default function LoaderComponent({ text }: { text?: string }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <Loader className="animate-spin" />
      {text && (
        <p className="text-center text-sm">{text}...</p>
      )}
    </div>
  )
}
