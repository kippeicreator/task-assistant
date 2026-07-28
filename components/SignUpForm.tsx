"use client";

import Link from "next/link";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);

    const router = useRouter();

    const handleSignUp = async () => {
        setMessage(null);

        const { error } = await authClient.signUp.email({
            name,
            email,
            password,
        });

        if (error) {
            setMessage(error.message ?? "ユーザー登録に失敗しました。");
            return;
        }

        router.replace("/signin");
    };

    return (
        <main>
            <h1>ユーザー登録</h1>
            {message && (
                <p role="status">
                    {message}
                </p>
            )}

            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSignUp();
                }}
            >
                <div>
                    <label htmlFor="name">
                        名前
                    </label>
                    <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email">
                        メールアドレス
                    </label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        パスワード
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit">
                    登録する
                </button>
            </form>

            <p>
                すでにアカウントをお持ちの方は{" "}
                <Link href="/signin">ログイン</Link>
            </p>
        </main>
    );
}
