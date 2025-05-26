import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Military/Cyberpunk theme colors
				military: {
					bg: '#0a0a0a',
					card: '#1a1a1a',
					border: '#2a2a2a',
					olive: '#556B2F',
					navy: '#1e3a8a',
					purple: '#4c1d95',
					metal: '#71717a'
				},
				cyber: {
					fuchsia: '#e879f9',
					cyan: '#06b6d4',
					neon: '#00ff41',
					warning: '#dc2626'
				},
				// Keep existing for compatibility
				dark: {
					bg: '#0a0a0a',
					card: '#1a1a1a',
					border: '#2a2a2a'
				},
				warm: {
					gray: '#e0e0e0',
					yellow: '#e879f9' // Changed to cyber fuchsia
				}
			},
			fontFamily: {
				'bebas': ['Bebas Neue', 'cursive'],
				'bebas-condensed': ['Bebas Neue Condensed', 'cursive'],
				'consolas': ['Consolas', 'Monaco', 'monospace'],
				'inter': ['Inter', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-warning': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'ember-glow': {
					'0%, 100%': {
						opacity: '0.8',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.1)'
					}
				},
				'smoke-drift': {
					'0%': {
						transform: 'translateY(0) translateX(0) rotate(0deg)',
						opacity: '0.7'
					},
					'100%': {
						transform: 'translateY(-20px) translateX(10px) rotate(5deg)',
						opacity: '0'
					}
				},
				'glitch-crt': {
					'0%, 100%': {
						transform: 'translateX(0)',
						filter: 'hue-rotate(0deg)'
					},
					'20%': {
						transform: 'translateX(-2px)',
						filter: 'hue-rotate(90deg)'
					},
					'40%': {
						transform: 'translateX(2px)',
						filter: 'hue-rotate(180deg)'
					},
					'60%': {
						transform: 'translateX(-1px)',
						filter: 'hue-rotate(270deg)'
					},
					'80%': {
						transform: 'translateX(1px)',
						filter: 'hue-rotate(360deg)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-warning': 'pulse-warning 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'ember-glow': 'ember-glow 2s ease-in-out infinite',
				'smoke-drift': 'smoke-drift 3s ease-out infinite',
				'glitch-crt': 'glitch-crt 0.15s ease-in-out'
			},
			backgroundImage: {
				'metal-brushed': 'linear-gradient(45deg, #71717a 0%, #a1a1aa 50%, #71717a 100%)',
				'scanlines': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.04) 2px, rgba(0, 255, 65, 0.04) 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
