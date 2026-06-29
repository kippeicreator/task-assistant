# 📚 課題コンパス (Task Assistant)

課題コンパスは、**大学生向けの学習計画作成Webアプリ**です。

課題名と締切日を入力するだけで、締切までの日数を計算し、
「今日やるべきこと」を分かりやすく提案します。

---

## 🌐 Demo

https://task-assistant-weld.vercel.app/

---

## 📖 背景

大学生活では、

- レポート
- プレゼン
- プログラミング課題
- 実験レポート

など、複数の課題を同時に管理する必要があります。

しかし、多くの学生は

- 締切直前まで着手できない
- 作業量が分からない
- 何から始めればよいか分からない

という問題を抱えています。

そこで、

**締切から逆算した学習計画を自動生成するアプリ**

として開発しました。

---

# ✨ 主な機能

- 課題名入力
- 締切日の入力
- 締切までの日数を自動計算
- 課題内容に応じた学習計画の生成
- シンプルでスマートフォンにも対応したUI

---

# 🛠 使用技術

| 技術 | 用途 |
|------|------|
| Next.js | フロントエンド |
| React | UI構築 |
| TypeScript | 型安全性 |
| Tailwind CSS | スタイリング |
| Vercel | デプロイ |

---

# 📂 ディレクトリ構成

```
task-assistant
├── app
├── components
├── lib
├── public
├── types
├── package.json
└── README.md
```

※現在リファクタリングを進めながら保守性を改善しています。

---

# 🚀 セットアップ

```bash
git clone https://github.com/kippeicreator/task-assistant.git

cd task-assistant

npm install

npm run dev
```

ブラウザで

```
http://localhost:3000
```

を開いてください。

---

# 🎯 今後のロードマップ

## Version 1.1

- 課題保存
- 編集・削除
- 複数課題管理

## Version 1.2

- Google Calendar連携
- 通知機能
- ダークモード

## Version 2.0

- AIによる学習計画生成
- 学習履歴分析
- 学習時間の可視化

---

# 🧠 このプロジェクトで学んだこと

- Next.js App Router
- Reactによる状態管理
- TypeScript
- Git / GitHub
- Vercelへのデプロイ
- UI/UX設計
- コンポーネント設計

---

# 🔧 今後改善したいこと

現在はMVP（Minimum Viable Product）として実装しています。

今後は

- UIとビジネスロジックの分離
- 型設計の改善
- テストコード追加
- パフォーマンス最適化
- アクセシビリティ改善

などを行い、
保守性・拡張性の高いアプリケーションへ改善していく予定です。

---

# 📈 開発方針

このプロジェクトでは

- 読みやすいコード
- 保守しやすい設計
- 小さく改善を積み重ねること

を意識して開発しています。

また、Google Software Engineerを目標としているため、
設計・品質・テスト・Git運用まで含めて継続的に改善しています。

---

# 👤 Author

**Kippei Ishimaru**

GitHub

https://github.com/kippeicreator