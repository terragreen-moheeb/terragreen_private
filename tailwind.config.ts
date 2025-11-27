import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/common/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/data_driven/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/front/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/userapp/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			screens: {
				'3xl': '1440px', // überschreibt das "screen-2xl" Verhalten
			},

			fontSize: {
				'xs': ['10px', { lineHeight: '1.22', letterSpacing: '-0.01rem' }],
				'sm': ['12px', { lineHeight: '1.22', letterSpacing: '-0.01rem' }],
				'base': ['14px', { lineHeight: '1.22', letterSpacing: '-0.01rem' }],
				'lg': ['16px', { lineHeight: '1.22', letterSpacing: '-0.01rem' }],
				'xl': ['18px', { lineHeight: '1.22', letterSpacing: '-0.01rem' }],
				'2xl': ['20px', { lineHeight: '1.22', letterSpacing: '-0.01rem' }],
				'3xl': ['25px', { lineHeight: '1.22', letterSpacing: '-0.01rem' }],
				'4xl': ['31px', { lineHeight: '1.22', letterSpacing: '-0.01rem' }],
				'5xl': ['39px', { lineHeight: '1.22', letterSpacing: '-0.01rem' }],
				'6xl': ['48px', { lineHeight: '1.16', letterSpacing: '-0.01rem' }],
				'7xl': ['59px', { lineHeight: '1.16', letterSpacing: '-0.01rem' }],
			},
		text: {
			primary: 'var(--text-primary)',
			secondary: 'var(--text-secondary)',
			muted: 'var(--text-muted)',
			inverse: 'var(--text-inverse)',
			white: 'var(--text-inverse)',
		},
		colors: {
			primary: {
				'50': 'var(--color-primary-50)',
				'100': 'var(--color-primary-100)',
				'200': 'var(--color-primary-200)',
				'300': 'var(--color-primary-300)',
				'400': 'var(--color-primary-400)',
				'500': 'var(--color-primary-500)',
				'600': 'var(--color-primary-600)',
				'700': 'var(--color-primary-700)',
				'800': 'var(--color-primary-800)',
				'900': 'var(--color-primary-900)',
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			sec: {
				'50': 'var(--color-sec-50)',
				'100': 'var(--color-sec-100)',
				'200': 'var(--color-sec-200)',
				'300': 'var(--color-sec-300)',
				'400': 'var(--color-sec-400)',
				'500': 'var(--color-sec-500)',
				'600': 'var(--color-sec-600)',
				'700': 'var(--color-sec-700)',
				'800': 'var(--color-sec-800)',
				'900': 'var(--color-sec-900)',
				DEFAULT: 'hsl(var(--sec))',
				foreground: 'hsl(var(--sec-foreground))'
			},

			gray: {
				'50': 'var(--color-sec-50)',
				'100': 'var(--color-sec-100)',
				'200': 'var(--color-sec-200)',
				'300': 'var(--color-sec-300)',
				'400': 'var(--color-sec-400)',
				'500': 'var(--color-sec-500)',
				'600': 'var(--color-sec-600)',
				'700': 'var(--color-sec-700)',
				'800': 'var(--color-sec-800)',
				'900': 'var(--color-sec-900)',
				DEFAULT: 'var(--color-sec-500)',
			},

			error: {
				'50': 'var(--color-error-50)',
				'100': 'var(--color-error-100)',
				'200': 'var(--color-error-200)',
				'300': 'var(--color-error-300)',
				'400': 'var(--color-error-400)',
				'500': 'var(--color-error-500)',
				'600': 'var(--color-error-600)',
				'700': 'var(--color-error-700)',
				'800': 'var(--color-error-800)',
				'900': 'var(--color-error-900)',
				DEFAULT: 'var(--color-error-500)',
			},
			success: {
				'50': 'var(--color-success-50)',
				'100': 'var(--color-success-100)',
				'200': 'var(--color-success-200)',
				'300': 'var(--color-success-300)',
				'400': 'var(--color-success-400)',
				'500': 'var(--color-success-500)',
				'600': 'var(--color-success-600)',
				'700': 'var(--color-success-700)',
				'800': 'var(--color-success-800)',
				'900': 'var(--color-success-900)',
				DEFAULT: 'var(--color-success-500)',
			},
			warning: {
				'50': 'var(--color-warning-50)',
				'100': 'var(--color-warning-100)',
				'200': 'var(--color-warning-200)',
				'300': 'var(--color-warning-300)',
				'400': 'var(--color-warning-400)',
				'500': 'var(--color-warning-500)',
				'600': 'var(--color-warning-600)',
				'700': 'var(--color-warning-700)',
				'800': 'var(--color-warning-800)',
				'900': 'var(--color-warning-900)',
				DEFAULT: 'var(--color-warning-500)',
			},
			notification: {
				'50': 'var(--color-notification-50)',
				'100': 'var(--color-notification-100)',
				'200': 'var(--color-notification-200)',
				'300': 'var(--color-notification-300)',
				'400': 'var(--color-notification-400)',
				'500': 'var(--color-notification-500)',
				'600': 'var(--color-notification-600)',
				'700': 'var(--color-notification-700)',
				'800': 'var(--color-notification-800)',
				'900': 'var(--color-notification-900)',
				DEFAULT: 'var(--color-notification-500)',
			},
			black: {
				'base': 'var(--color-base-black)',
				'50': 'var(--color-base-black)',
				'100': 'var(--color-base-black)',
				'200': 'var(--color-base-black)',
				'300': 'var(--color-base-black)',
				'400': 'var(--color-base-black)',
				'500': 'var(--color-base-black)',
				'600': 'var(--color-base-black)',
				'700': 'var(--color-base-black)',
				'800': 'var(--color-base-black)',
				'900': 'var(--color-base-black)',
				DEFAULT: 'var(--color-base-black)',
				foreground: 'var(--color-base-black)'
			},
			white: {
				'base': 'var(--color-base-white)',
				'50': 'var(--color-base-white)',
				'100': 'var(--color-base-white)',
				'200': 'var(--color-base-white)',
				'300': 'var(--color-base-white)',
				'400': 'var(--color-base-white)',
				'500': 'var(--color-base-white)',
				'600': 'var(--color-base-white)',
				'700': 'var(--color-base-white)',
				'800': 'var(--color-base-white)',
				'900': 'var(--color-base-white)',
				DEFAULT: 'var(--color-base-white)',
				foreground: 'var(--color-base-white)'
			},
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		maxWidth: {
			layout: '1440px', // Standard Layout Breite
			'layout-sm': '100%',   // Für kleinere Container
			'layout-xl': '98%',  // Für sehr große Screens
		},

		fontFamily: {
			'space-grotesk': 'var(--font-space-grotesk)',
			'crimson-italic': 'var(--font-crimson-italic)',
			'crimson-regular': 'var(--font-crimson-regular)',

			// Semantic font assignments
			'title': 'var(--font-space-grotesk)',
			'body': 'var(--font-space-grotesk)',
			'heading': 'var(--font-space-grotesk)',
			'serif': 'var(--font-space-grotesk)',

		},
		lineHeight: {
			'relaxed': '1.5',
		},
		borderRadius: {
			lg: 'var(--global-radius-lg)',
			md: 'var(--global-radius-md)',
			sm: 'var(--global-radius-sm)'
		},
		boxShadow: {
			'filter-box': '0 10px 15px -3px rgba(124, 124, 124, 0.01), 0 5px 25px -11px rgba(0, 0, 0, 0.04)',
		},
		animation: {
			'spin-slow': 'spin 8s linear infinite',
			'spin-slower': 'spin 12s linear infinite',
			'spin-reverse': 'spin 10s linear infinite reverse',
			'fade-in': 'fadeIn 0.5s ease-in-out',
			'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
		},
		keyframes: {
			fadeIn: {
				'0%': { opacity: '0', transform: 'translateY(-10px)' },
				'100%': { opacity: '1', transform: 'translateY(0)' },
			},
			pulseGlow: {
				'0%, 100%': { opacity: '0.3' },
				'50%': { opacity: '0.6' },
			},
		},
	}
},
};

export default config;