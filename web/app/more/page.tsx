import { Navbar } from "@/components/navbar"

export default function LearnMorePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
        <Navbar />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Learn more</h1>
        <p className="text-gray-600 mb-8">Choose what you would like to learn about</p>
      </div>
    </div>
  );
}
