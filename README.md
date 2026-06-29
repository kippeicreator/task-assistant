# 課題コンパス / Task Assistant

課題コンパスは、大学生向けの学習計画作成アプリです。  
課題名と締切を入力すると、締切までの日数に応じて「今日やるべきこと」「次に進めること」を整理できます。

## URL

https://task-assistant-weld.vercel.app/

## 開発背景

大学生は、レポート・発表・プログラミング課題など複数の締切を同時に抱えがちです。  
しかし、締切直前まで着手できず、作業が集中してしまうことがあります。

このアプリは、課題の締切から逆算して行動計画を立てることで、課題の先延ばしを減らすことを目的に作りました。

## 主な機能

- 課題名の入力
- 締切日の入力
- 締切までの日数計算
- 課題内容に応じた学習計画の生成
- スマートフォンでも使いやすいシンプルなUI

## 使用技術

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel

## セットアップ方法

```bash
git clone https://github.com/kippeicreator/task-assistant.git
cd task-assistant
npm install
npm run dev