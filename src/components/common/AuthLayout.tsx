import Image from 'next/image';

export default function AuthLayout({
    children,
    image = '/login-bg.webp',
}: {
    children: React.ReactNode;
    image?: string;
}) {
    return (
        <div className="relative flex min-h-screen">
            {/* Hintergrundbild - Fullscreen */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={image}
                    alt="Login Hintergrund"
                    fill
                    priority
                    draggable={false}
                    className="object-cover object-center"
                />
                {/* Overlay für bessere Lesbarkeit */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Logo oben links */}
            <div className="absolute top-8 left-8 z-20">
                <Image
                    src="/logo.svg"
                    alt="TerraGreen Logo"
                    width={160}
                    height={64}
                    priority
                    draggable={false}
                    className="drop-shadow-2xl"
                />
            </div>

            {/* Content - Zentriert mit Backdrop */}
            <div className="relative z-10 w-full flex items-center justify-center min-h-screen px-4 py-12">
                <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
