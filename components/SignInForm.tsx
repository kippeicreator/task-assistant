"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
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

        setMessage("ログインしました。");
        setEmail("");
        setPassword("");
    };

    return (
        <main>
            <h1>ログイン</h1>

            {message && <p>{message}</p>}

            <div>
                <label>
                    メールアドレス
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
            </div>

            <div>
                <label>
                    パスワード
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
            </div>

            <button type="button" onClick={handleSignIn}>
                ログインする
            </button>
        </main>
    );
}