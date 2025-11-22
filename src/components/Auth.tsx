import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'

export default function AuthComponent() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Sign in to B2B Space</h2>
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={[]}
                    redirectTo={window.location.origin}
                />
            </div>
        </div>
    )
}
