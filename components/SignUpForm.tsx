"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);

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

        setMessage("ユーザー登録が完了しました。");
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <main>
            <h1>ユーザー登録</h1>

            {message && <p>{message}</p>}

            <div>
                <label>
                    名前
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
            </div>

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

            <button type="button" onClick={handleSignUp}>
                登録する
            </button>
        </main>
    );
}