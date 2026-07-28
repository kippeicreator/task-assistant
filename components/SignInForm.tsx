"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


export default function SignInForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const handleSignIn = async () => {
        setMessage(null);

        const { error } = await authClient.signIn.email({
            email,
            password,
        });

        if (error) {
            setMessage(error.message ?? "ログインに失敗しました。");
            return;
        }

        router.push("/");
        router.refresh();
    };

    return (
        <main>
            <h1>ログイン</h1>

            {message && (<p role="alert">{message}</p>)}
            <form onSubmit={(event) => {
                event.preventDefault();
                handleSignIn();
            }}>
                <div>
                    <label htmlFor="email">
                        メールアドレス
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <label htmlFor="password">
                        パスワード
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>
                </div>

                <button type="submit">
                    ログインする
                </button>
            </form>
        </main>
    );
}
