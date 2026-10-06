# Hakimi Deuteranopia Safe

面向绿色盲（Deuteranopia）的明暗配色，提供 VS Code、Zed 主题和可供其他项目使用的 JS / CSS / SCSS / Less 配色库。

语法角色主要通过亮度、蓝黄方向和字体样式区分。关键词使用粗体，注释使用斜体；VS Code 的错误语法使用粗体和下划线，Zed 使用粗体。颜色差异通过绿色盲模拟后再检查，不依赖红绿对立。

## 项目结构

```text
src/
  palette.json          所有颜色的唯一来源，包含 light / dark
  vscode.json           VS Code 扩展信息和共享主题映射
  zed.json              Zed 扩展信息和共享主题映射
  colors.mjs            生成和可读性审计共用的颜色计算
scripts/
  build.mjs             生成配色库及两个编辑器的发布目录
  package-vscode.mjs    使用本地、锁定版本的 VSCE 打包
  test.mjs              现有产物校验
  verify-*.mjs          现有主题覆盖和一致性校验
  audit-deutan.mjs      现有绿色盲可读性审计
images/                 图标源文件
dist/                   生成的 npm 配色库，不提交
vscode/                 生成的 VS Code 扩展，不提交
zed/                    生成的 Zed 扩展，提交以支持直接分发
artifacts/              本地 VSIX 和 npm 压缩包，不提交
```

修改配色时编辑 `src/palette.json`；修改编辑器映射时编辑相应的 JSON。生成目录里的文件会被下一次构建覆盖。

映射中的 `$foreground` 引用当前版本的颜色，`$primary/33` 在不透明颜色后添加十六进制透明度。只有明暗确实不同时，使用 `{ "light": "...", "dark": "..." }`。同一套语法规则生成两种版本，不分别维护两份大模板。

所有产物的版本来自根目录 `package.json`。VS Code 清单和 Zed 清单由构建生成，无需手动同步版本。

## 开发与打包

需要 Node.js 22 或更新版本。生成主题只用 Node 自带模块，无需 Rust、Cargo 或 Whiskers。

```sh
npm ci                 # 按已提交的锁文件安装开发工具
npm run build          # 只生成，不安装工具、不打包、不发布
npm test               # 先生成，再运行全部现有校验
npm run check          # 生成、校验和 lint
npm run fmt            # 格式化源码
npm run package:vscode # 校验后生成 artifacts/*.vsix
npm run package:npm    # 校验后生成 artifacts/*.tgz
```

安装 VS Code 主题：在扩展面板选择“从 VSIX 安装”，打开 `artifacts/` 中的 VSIX，然后选择 Hakimi Deuteranopia Light 或 Dark。

Zed 的扩展目录是 `zed/`，其中包含清单、许可证和明暗主题。选择“Install Dev Extension”时指定该目录。

npm 包只包含 `dist/`、README、许可证和包清单；VSIX 只包含扩展清单、主题、README、许可证和图标。打包操作不会发布到任何平台。

## 配色库

```js
import { flavors, flavorEntries, theme, version } from 'hakimi-deutan-theme';

const background = flavors.dark.colors.surface_editor.hex;
const keyword = flavors.dark.colors.syn_keyword;
// keyword.hex / alpha / rgb / hsl / oklch
```

样式入口分别为 `hakimi-deutan-theme/css`、`hakimi-deutan-theme/scss` 和 `hakimi-deutan-theme/less`；原始配色数据入口为 `hakimi-deutan-theme/palette.json`。

CSS 使用 `--cb-background`、`--cb-syn-keyword` 等变量。默认使用亮色，通过 `.theme-dark` 切换暗色，`.theme-light` 明确使用亮色。SCSS / Less 使用 `$cb-dark-background` / `@cb-dark-background` 等变量。

类型声明和全部样式变量从实际颜色键生成，包含透明度和界面背景色。

## 校验方式

现有校验脚本从源码配色核对生成结果，并检查语义高亮、TextMate 后备规则、Zed 字体样式、界面覆盖和终端颜色。可读性审计采用：

```text
sRGB → 必要的透明度混合 → linear RGB → LMS 绿色盲模拟 → sRGB
```

在模拟颜色上检查 APCA Lc 和 OKLab 色差。普通语法文字要求 Lc ≥ 60，粗体要求 ≥ 50，注释和界面文字要求 ≥ 45。字体样式按实际规则读取，包含语言专用规则；界面文字检查包含内联提示和按钮悬停状态。Zed 检查全部生成的语法样式，以及界面文字、交互状态、行号、Vim 模式指示器和终端 ANSI 颜色。

这些自动检查不能替代编辑器中的实际体验评估。调整映射后，应在目标语言、编辑器和字体配置下检查视觉效果。

## 2.0 的不兼容变化

- 根目录的 `package.json` 专门描述 npm 配色库，VS Code 扩展清单位于生成的 `vscode/package.json`。
- VS Code 主题从 `vscode-themes/` 移到 `vscode/themes/`。旧 `templates/*.tera` 被共享 JSON 映射取代。
- 移除未被主题使用的 IBM、Wong、Tol 和成对配色集合。主题使用的色值保留为具体界面或语法角色。
- 所有实际颜色项都有类型声明和样式变量；每个颜色项新增 `alpha`。
- `npm run build` 只生成。打包使用独立命令，产物统一放在 `artifacts/`。
- 修正内置符号语义选择器、内联提示对比度，以及语言专用规则覆盖粗体的问题。

## License

MIT
