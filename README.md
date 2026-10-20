# Hakimi Deuteranopia Safe

面向绿色盲（Deuteranopia）的明暗配色，提供 VS Code、Zed、Obsidian 主题和可供其他项目使用的 JS / CSS / SCSS / Less 配色库。

语法角色主要通过亮度、蓝黄方向和字体样式区分。关键词使用粗体，注释使用斜体；VS Code 的错误语法使用粗体和下划线，Zed 使用粗体。颜色差异通过绿色盲模拟后再检查，不依赖红绿对立。

## 编辑器语法设计：6 基础色 × 4 字型矩阵

### 1. 绿色盲视觉设计原理
绿色盲（Deuteranopia）由于缺失绿色敏感视锥细胞，红-绿通道丧失鉴别能力，传统的红/绿/橙/棕语法高亮在视野中会退化为接近的黄褐色系。但绿色盲视力保留了完整的**蓝-黄（冷-暖）感知轴**与**明度（Lightness）对比感知**。

为了在保证美观的同时实现绝对无歧义的代码阅读体验，Hakimi 摒弃了杂乱无章的多色杂糅，提炼出正交的 **6 基础色槽 × 4 种字体样式（常规 / 粗体 / 斜体 / 粗斜体）** 语法矩阵：
- **冷色组（Cool）**：
  - **冷色 1 (`mauve`)**：结构引导、语言控制、内置核心与标签
  - **冷色 2 (`green`)**：字面量文本、正则/转义、模块包命名空间
- **暖色组（Warm）**：
  - **暖色 1 (`blue`)**：操作执行、函数方法、组件构造
  - **暖色 2 (`yellow`)**：类型定义、实体规格、宏与注解修饰
- **中性组（Neutral）**：
  - **中性 1 (`text`)**：用户定义的数据载体（变量、属性、形参）
  - **中性 2 (`overlay2`)**：次级视觉层（标点、注释、文档）
- **语义告警（Error）**：`red`，仅用于非法语法与报错，且强制绑定加粗与下划线双重形态学提示。

### 2. 6 基础色 × 4 字型核心矩阵

| 色槽类别 | 对应色值 (Light / Dark) | 常规 (Normal) | 加粗 (Bold) | 斜体 (Italic) | 粗斜体 (Bold Italic) |
|---|---|---|---|---|---|
| **冷色 1 (`mauve`)** | `#336fd6` / `#7ab2ff` | HTML/XML 标签名 (`tag`) | 核心关键字 / 控制流程 (`keyword`, `storage.type`) | 自身指向 / 生命周期 / 异步修饰 (`this`, `self`, `lifetime`, `async`) | 语言内置类型 / 核心库基类 (`support.class.builtin`, `type.defaultLibrary`) |
| **冷色 2 (`green`)** | `#004b8f` / `#80dcff` | 字符串字面量 (`string`) | 转义字符 / 正则表达式 / 格式占位符 (`escape`, `regexp`) | 命名空间 / 模块 / 包名 (`namespace`, `module`, `package`) | — |
| **暖色 1 (`blue`)** | `#8a5200` / `#f0d68f` | 普通函数 / 方法调用与定义 (`function`, `method`) | 组件 / 构造器 / 枚举成员 (`component`, `constructor`, `enum-variant`) | — | — |
| **暖色 2 (`yellow`)** | `#3a1f0b` / `#ff9536` | 数值 / 布尔值字面量 (`number`, `boolean`) | 自定义类 / 结构体 / 枚举 / 声明常量 (`class`, `struct`, `enum`, `constant`) | 抽象类型 / 接口 / Trait / 泛型形参 (`type`, `interface`, `trait`, `typeParameter`) | 宏 / 装饰器 / 编译器指令 / 注解 (`macro`, `decorator`, `annotation`, `preproc`) |
| **中性 1 (`text`)** | `#45494c` / `#e0e0e0` | 局部变量 / 属性 / 结构字段 (`variable`, `property`, `field`) | — | 函数实参 / 形参 / 标签属性名 (`parameter`, `attribute-name`) | — |
| **中性 2 (`overlay2`)**| `#6f706f` / `#99a0a8` | 标点符号 / 括号 / 分隔符 (`punctuation`, `delimiter`, `bracket`) | — | 单行与多行注释 (`comment`) | 文档注释与 Doc 标签 (`comment.doc`, `entity.name.tag.documentation`) |
| **语义告警 (`red`)** | `#6f1f65` / `#ff8585` | — | 语法错误与非法标记 (`invalid`, `error`, 粗体+下划线) | — | — |

### 3. 五大主流语言映射表 (TypeScript/TSX, Python, Go, Java, Rust)

| 色槽 + 字型 | TypeScript / TSX | Python | Go | Java | Rust |
|---|---|---|---|---|---|
| **`mauve` 常规** | `<div>`, `<span>` 标签名 | — | — | — | — |
| **`mauve` 加粗** | `const`, `function`, `return`, `if`, `import`, `export` | `def`, `class`, `return`, `if`, `for`, `import`, `with` | `func`, `package`, `import`, `return`, `if`, `for`, `defer`, `chan` | `public`, `class`, `void`, `return`, `if`, `new`, `extends` | `fn`, `let`, `pub`, `struct`, `impl`, `trait`, `match`, `use` |
| **`mauve` 斜体** | `this`, `super`, `async`, `typeof`, `keyof`, `readonly` | `self`, `cls`, `async`, `lambda` | — | `this`, `super`, `static`, `final`, `abstract`, `synchronized` | `'a` (生命周期), `mut` (修饰符), `self`, `Self`, `async` |
| **`mauve` 粗斜体** | `Promise`, `Array`, `Record`, `String`, `any`, `unknown` | `str`, `int`, `list`, `dict`, `set`, `Exception`, `isinstance` | `string`, `int`, `bool`, `error`, `byte`, `make`, `append`, `nil` | `int`, `boolean`, `String`, `Integer`, `List`, `Map`, `Object` | `i32`, `usize`, `bool`, `String`, `Vec`, `Option`, `Result`, `Some` |
| **`green` 常规** | `'hello'`, `"world"`, `` `template ${x}` `` | `'hello'`, `"world"`, `f"hi {x}"` | `"hello"`, `` `raw string` `` | `"string literal"` | `"string"`, `r#"raw string"#` |
| **`green` 加粗** | `\n`, `\t`, `/[a-z]+/`, `${` `}` 模板占位 | `\n`, `r"[a-z]+"`, `{}` 格式占位 | `\n`, `%s`, `%d`, `%v` 格式占位 | `\n`, `\t`, `Pattern.compile()` | `\n`, `\0`, `{}` 格式占位 |
| **`green` 斜体** | `namespace Foo`, 模块导入名 | `import numpy as np` 模块别名 | `package main`, `import "fmt"` | `package com.app`, `import java.util.*` | `crate::models`, `use std::collections` |
| **`blue` 常规** | `fetch()`, `console.log()` | `calculate()`, `math.sqrt()` | `fmt.Println()`, `ServeHTTP()` | `list.stream()`, `calc.sum()` | `iter().map()`, `tokio::spawn()` |
| **`blue` 加粗** | React `<Header />`, `new User()` | `__init__`, `__str__`, 魔法方法 | `NewServer()` 构造函数 | `public User()` 构造函数 | `Status::Active` (枚举项), `User::new()` |
| **`yellow` 常规** | `123`, `3.14`, `true`, `false` | `123`, `3.14`, `True`, `False`, `None` | `42`, `3.14`, `true`, `false`, `iota` | `100L`, `0.5f`, `true`, `false`, `null` | `100_000`, `3.14`, `true`, `false` |
| **`yellow` 加粗** | `class Person`, `enum Status`, `MAX_RETRIES` | `class Person:`, `MAX_RETRIES` | `type User struct`, `const Timeout` | `class Customer`, `enum State`, `MAX_COUNT` | `struct Config`, `enum Message`, `const MAX` |
| **`yellow` 斜体** | `interface User`, `type ID`, `T` 泛型形参 | `x: int | str`, `Callable` 类型注解 | `type Reader interface`, `[T any]` | `interface Runnable`, `class Box<T>` | `trait Display`, `impl<T: Clone>` |
| **`yellow` 粗斜体** | `@deprecated`, `@observable` 装饰器 | `@dataclass`, `@property`, `@fixture` | `//go:build`, `//go:generate` 指令 | `@Override`, `@Autowired`, `@Entity` | `println!()`, `vec![]`, `#[derive(Debug)]` |
| **`text` 常规** | `user`, `user.name`, `x` | `user`, `self.name`, `x` | `user`, `req.Header` | `user`, `this.name` | `user`, `point.x` |
| **`text` 斜体** | `function(foo, bar)`, `id="app"` 属性 | `def run(foo, bar=1)` 形参 | `func handle(w, r)` 形参 | `void setAge(int age)` 形参 | `fn run(input: &str)` 形参 |
| **`overlay2` 常规** | `{`, `}`, `(`, `)`, `;`, `,`, `<`, `>` 标点 | `(`, `)`, `:`, `,`, `.` 标点 | `{`, `}`, `:=`, `;`, `,` 标点 | `{`, `}`, `;`, `,`, `@` 标点 | `{`, `}`, `::`, `->`, `;`, `,` 标点 |
| **`overlay2` 斜体** | `// comment`, `/* comment */` | `# line comment` | `// line comment` | `// comment`, `/* comment */` | `// line comment` |
| **`overlay2` 粗斜体** | `/** @param foo */`, JSDoc | `"""docstring"""`, PEP-257 | Godoc 文档注释块 | `/** @param <T> */`, Javadoc | `/// Doc comment`, `//! Crate doc` |
| **`red` 加粗+下划线** | 语法解析错误、未闭合语法 | 语法解析错误 | 编译错误语法 | 编译错误语法 | 编译错误语法 |

### 4. 终端 ANSI 16 色映射表 (VS Code & Zed)

终端主题不引入额外色值，100% 复用编辑器核心色板（2 冷 + 2 暖 + 1 告警红 + 2 中性色），保证终端高频状态色（`Red`、`Green`、`Yellow`、`Blue`、`Cyan`）两两绿色盲色差 $\Delta E_{\text{OKLab}} \ge 0.08$ 且全槽位对比度 $\text{APCA } L_c \ge 45$：

| ANSI 槽位 | 复用色槽 | Light / Dark 色值 | 常见 CLI 语义场景 |
|---|---|---|---|
| **Black (`0`) / BrightWhite (`15`)** | **中性 1 (`text`)** | `#45494c` / `#e0e0e0` | 终端主文本、反白强调文本 |
| **White (`7`) / BrightBlack (`8`)** | **中性 2 (`overlay2`)** | `#6f706f` / `#99a0a8` | `zsh` 自动补全、行号、时间戳与次要日志 |
| **Red (`1` / `9`)** | **语义告警 (`red`)** | `#6f1f65` / `#ff8585` | 错误输出、`git diff -` 删除行 |
| **Green (`2` / `10`)** | **冷色 2 (`green`)** | `#004b8f` / `#80dcff` | 成功状态、`git diff +` 新增行、可执行文件 |
| **Yellow (`3` / `11`)** | **暖色 1 (`blue`)** | `#8a5200` / `#f0d68f` | 警告提示、`git` 修改状态与 Commit Hash |
| **Blue (`4` / `12`)** | **冷色 1 (`mauve`)** | `#336fd6` / `#7ab2ff` | 目录文件夹、主键信息 |
| **Cyan (`6` / `14`)** | **暖色 2 (`yellow`)** | `#3a1f0b` / `#ff9536` | 软链接、`git diff @@` 块标题、位置提示 |
| **Magenta (`5` / `13`)** | **复用告警 (`red`)** | `#6f1f65` / `#ff8585` | 低频媒体/归档文件标识 |

## 项目结构

```text
src/
  palette.json          所有颜色的唯一来源（对齐 Catppuccin 26 令牌），包含 light / dark
  vscode/               对齐 catppuccin/vscode 的模块化主题映射（uiColors、semanticTokens、tokenColors、extensions 等）
  zed/                  对齐 catppuccin/zed 的主题与语法映射
  obsidian/             对齐 catppuccin/obsidian 的模块化主题构建（appVariables、paletteVars、syntax、components 等）
  colors.mjs            生成、颜色混合（opacity / mix / shade）和可读性审计共用的颜色计算
scripts/
  build.mjs             生成配色库及编辑器的发布目录
  package-vscode.mjs    使用本地、锁定版本的 VSCE 打包
  test.mjs              现有产物校验
  verify-*.mjs          现有主题覆盖和一致性校验
  audit-deutan.mjs      现有绿色盲可读性审计
images/                 图标源文件
dist/                   生成的 npm 配色库，不提交
vscode/                 生成的 VS Code 扩展，不提交
zed/                    生成的 Zed 扩展，提交以支持直接分发
obsidian/               生成的 Obsidian 主题（theme.css、manifest.json），提交以支持直接分发
artifacts/              本地 VSIX 和 npm 压缩包，不提交
```

修改配色时编辑 `src/palette.json`；修改编辑器或应用映射时编辑 `src/vscode/`、`src/zed/` 或 `src/obsidian/` 下的模块。生成目录里的文件会被下一次构建覆盖。

映射模块通过 `colors.mjs` 中的 `opacity()`、`mix()` 和 `shade()` 直接基于 `palette.json` 的 26 个标准令牌计算明暗两套主题，同一套语法与界面规则生成两种版本，不分别维护两份大模板。

所有产物的版本来自根目录 `package.json`。VS Code 清单、Zed 清单和 Obsidian 清单由构建生成，无需手动同步版本。

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

安装 Obsidian 主题：在 Obsidian Vault（库）的配置目录 `.obsidian/themes/` 下新建目录 `Hakimi Deuteranopia Safe`，将构建生成的 `obsidian/theme.css` 和 `obsidian/manifest.json` 复制到该目录下（即 `.obsidian/themes/Hakimi Deuteranopia Safe/theme.css` 与 `manifest.json`），随后在 Obsidian 设置 -> 外观 -> 主题中选择“Hakimi Deuteranopia Safe”。支持在“外观 -> 颜色偏好”中切换明暗模式，并完全兼容 Style Settings 插件。

npm 包只包含 `dist/`、README、许可证和包清单；VSIX 只包含扩展清单、主题、README、许可证和图标。打包操作不会发布到任何平台。

## 配色库

```js
import { flavors, flavorEntries, theme, version } from 'hakimi-deutan-theme';

const background = flavors.dark.colors.base.hex;
const keyword = flavors.dark.colors.mauve;
// keyword.hex / alpha / rgb / hsl / oklch
```

样式入口分别为 `hakimi-deutan-theme/css`、`hakimi-deutan-theme/scss` 和 `hakimi-deutan-theme/less`；原始配色数据入口为 `hakimi-deutan-theme/palette.json`。

CSS 使用 `--cb-base`、`--cb-mauve` 等变量。默认使用亮色，通过 `.theme-dark` 切换暗色，`.theme-light` 明确使用亮色。SCSS / Less 使用 `$cb-dark-base` / `@cb-dark-base` 等变量。

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
