import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Moon, Sun } from 'lucide-react'

function App() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">B2B Space</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to B2B Space</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A beautiful React application with shadcn/ui components and a custom design system
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Custom Design System</CardTitle>
              <CardDescription>
                Tailored color palette with warm tones and professional aesthetics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>Primary</Badge>
              <Badge variant="secondary" className="ml-2">Secondary</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shadcn UI Components</CardTitle>
              <CardDescription>
                Beautiful, accessible components built with Radix UI and Tailwind CSS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dark Mode Support</CardTitle>
              <CardDescription>
                Toggle between light and dark themes seamlessly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={toggleTheme}>
                Switch Theme
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Demo Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Example Form</CardTitle>
            <CardDescription>
              See the design system in action with form inputs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="flex-1">Submit</Button>
                <Button type="button" variant="outline" className="flex-1">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Color Showcase */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Color Palette</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-primary shadow-md"></div>
              <p className="text-sm text-center font-medium">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-secondary shadow-md"></div>
              <p className="text-sm text-center font-medium">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-accent shadow-md"></div>
              <p className="text-sm text-center font-medium">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-muted shadow-md"></div>
              <p className="text-sm text-center font-medium">Muted</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-card border border-border shadow-md"></div>
              <p className="text-sm text-center font-medium">Card</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-destructive shadow-md"></div>
              <p className="text-sm text-center font-medium">Destructive</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Built with React, Vite, Tailwind CSS, and shadcn/ui</p>
        </div>
      </footer>
    </div>
  )
}

export default App

