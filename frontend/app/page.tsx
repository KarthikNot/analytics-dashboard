// app/page.tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-4">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Welcome to <span className="text-accent">AdMyBrand</span> 🚀
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Navigate using the top navbar to manage your ad campaigns, view analytics,
          and connect with APIs 🔥
        </p>
      </div>
    </main>
  )
}
