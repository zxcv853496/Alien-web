---
description: 如何在本專案中使用 Gitflow 工作流程
---

# Gitflow 工作流程

所有變更都必須遵循 Gitflow 分支模型。

## 分支策略 (Branching Strategy)

- **main**: 生產環境就緒的程式碼 (Production-ready)。**請勿直接推送到 main**。
- **develop**: 新功能的整合分支。所有功能分支都應合併回此處。
- **feature/[功能名稱]**: 用於新功能或非關鍵的 UI 變更。
  - 來源分支：`develop`
  - 合併回：`develop`
- **hotfix/[問題名稱]**: 用於緊急的生產環境修復。
  - 來源分支：`main`
  - 合併回：`main` **以及** `develop`

## 新功能的開發流程 (New Features)

1.  **開始新功能**：
    ```bash
    git checkout develop
    git pull origin develop
    git checkout -b feature/my-new-feature
    ```

2.  **開發與提交**：
    - 頻繁提交 (commit)，並使用清晰的提交訊息。

3.  **完成功能**：
    ```bash
    git checkout develop
    git pull origin develop
    git merge feature/my-new-feature
    git push origin develop
    git branch -d feature/my-new-feature
    ```
    *(註：在團隊環境中，這通常會是一個 Pull Request。作為獨立 Agent，除非另有指示，否則在本地合併是可以接受的。)*

## 緊急修復的流程 (Hotfixes)

1.  **開始修復**：
    ```bash
    git checkout main
    git pull origin main
    git checkout -b hotfix/critical-bug
    ```

2.  **套用修復並提交**。

3.  **完成修復**：
    - 合併回 `main`：
      ```bash
      git checkout main
      git merge hotfix/critical-bug
      git push origin main
      ```
    - 合併回 `develop`：
      ```bash
      git checkout develop
      git merge hotfix/critical-bug
      git push origin develop
      ```
    - 刪除分支：
      ```bash
      git branch -d hotfix/critical-bug
      ```
