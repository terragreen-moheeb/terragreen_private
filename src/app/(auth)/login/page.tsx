'use client';

import LoginForm from "@/components/auth/LoginForm";
import AuthLayout from "../../../components/common/AuthLayout";

export default function LoginPage() {
    return (
        <AuthLayout >
            <LoginForm />
        </AuthLayout>
    );
}
