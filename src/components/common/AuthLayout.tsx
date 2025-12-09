import Image from 'next/image';

export default function AuthLayout({
    children,
    rightImageSrc = '/images/auth/immo1.webp',
}: {
    children: React.ReactNode;
    rightImageSrc?: string;
}) {
    return (
        <div className="flex min-h-screen">
                <div className="hidden lg:flex lg:w-[80%] relative">
                <Image
                    src={rightImageSrc || '/images/auth/immo1.webp'}
                     alt="Login Hintergrund"
                    fill
                    priority
                    draggable={false}

                    className="object-cover object-center"
                />
            </div>
            <div className="w-full lg:w-[40%] flex flex-col justify-center py-4 px-2 sm:px-2 lg:px-3 bg-white ">


                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-xl">
                    {children}
                </div>
            </div>

        
        </div>
    );
}
