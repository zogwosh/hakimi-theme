# Hakimi Deuteranopia 主题设计哲学与工程规范

> **版本**：2.0.0  
> **定位**：面向绿色盲（Deuteranopia）与高认知效率编码场景的现代 VS Code 主题体系。  
> **核心原则**：纯语义设计 Token 驱动、空间明度感知分层、Modern UI 物理流体接合、色彩 × 字形双重编码（Dual-Coding）、LSP 语义级深度集成。

---

## 目录

1. [背景与架构重构意图](#一背景与架构重构意图)
2. [工作区四层空间流体明度模型 (Four-Zone Spatial Model)](#二工作区四层空间流体明度模型-four-zone-spatial-model)
3. [VS Code Modern UI 连通标签页工程原理解析 (Connected Tabs Engine)](#三vs-code-modern-ui-连通标签页工程原理解析-connected-tabs-engine)
4. [认知双重编码矩阵：色彩 × 字形 (Cognitive Dual-Coding Matrix)](#四认知双重编码矩阵色彩--字形-cognitive-dual-coding-matrix)
5. [绿色盲可访问性工程与量化标准 (Deuteranopia Engineering)](#五绿色盲可访问性工程与量化标准-deuteranopia-engineering)
6. [两层语法渲染生态：LSP Semantic Tokens 与 TextMate](#六两层语法渲染生态lsp-semantic-tokens-与-textmate)
7. [Zed Editor Tree-sitter 高精语法捕获与架构设计](#七zed-editor-tree-sitter-高精语法捕获与架构设计)
8. [Obsidian 主题设计与官方 CSS Variables 架构](#八obsidian-主题设计与官方-css-variables-架构)
9. [质量保障与自动化验证体系](#九质量保障与自动化验证体系)

---

## 一、背景与架构重构意图

### 1.1 摒弃传统调色板映射（Legacy Palette Flaws）
早期主题往往依赖第三方通用调色板（例如 Catppuccin 的 `mauve`、`crust`、`mantle`、`surface*` 等硬编码别名）。这种模式在实际工程中有三大硬伤：
- **语义抽象倒置**：UI 元素被绑定到了“颜色名称”（如将侧边栏背景绑定给 `mantle`），而非其在界面中所承担的“功能语义”（如 `tokens.bg.sidebar`）。
- **空间感知失真**：调色板色阶是离散且静态的，无法根据主编辑区底色自动维持物理光照与视觉落差。
- **无障碍保障困难**：静态色系在红-绿辨色障碍（Deuteranopia）模拟下，红绿橙棕等色彩极易退化坍缩为无法分辨的黄褐色块。

### 1.2 现代语义 Token 体系
Hakimi 2.0.0 采用纯净的语义 Token 架构：
- **`bg.*`**：空间分层基色（`editor`, `chrome`, `sidebar`, `panel`, `canvas`）。
- **`fg.*`**：信息密度前景色（`default`, `muted`, `subtle`）。
- **`border.*`**：界面边界控制（`subtle`, `default`, `focus`）。
- **`intent.*`**：状态意图色（`info`, `success`, `warning`, `error`）。
- **`syntax.*`**：语法功能角色色（`keyword`, `function`, `type`, `string`, `number`, `variable`, `parameter`, `constant`, `comment`, `punctuation`, `tag`, `attribute`, `regex`）。

---

## 二、工作区四层空间流体明度模型 (Four-Zone Spatial Model)

现代 IDE 界面不应是一张扁平的色块拼图，而应体现具备物理秩序的空间包裹感。Hakimi 确立了严格的 **四层空间流体明度模型**：

```
+--------------------------------------------------------------+
|                    TitleBar (bg.chrome)                      |
+--------------+-------------------------------+---------------+
|              |      Tab Bar (bg.chrome)      |               |
|              +-------------------------------+               |
|   SideBar    |                               | AuxiliaryBar  |
| (bg.sidebar) |      Editor (bg.editor)       |  (bg.panel)   |
|              |                               |               |
|              +-------------------------------+               |
|              |      Bottom Panel (bg.panel)  |               |
+--------------+-------------------------------+---------------+
|                    StatusBar (bg.chrome)                     |
+--------------------------------------------------------------+
```

### 2.1 规则 1：顶底框架严格同色（Top-Bottom Chrome Harmony）
- **实现约束**：`TitleBar` 与 `StatusBar` 必须使用完全一致的色值 `tokens.bg.chrome`。
- **设计考量**：顶栏（窗口操作/全局导航）与底栏（环境状态/行号分支）属于 IDE 的最外层系统装配架（Shell）。一致的明度构建出上下对齐的视觉锚点，防止视线在窗口边缘发生顿挫。

### 2.2 规则 2：主侧边栏独立感知层级（Primary SideBar）
- **实现约束**：侧边栏背景必须使用独立派生色 `tokens.bg.sidebar`。
- **感知设计**：
  - 在暗色模式下，侧边栏略微下沉于主编辑区，收敛非活动区域的视觉权重；
  - 在亮色模式下，侧边栏保持温和轻浅，清晰界定文件树与工作区边界。

### 2.3 规则 3：辅助区域独立统合（Secondary Auxiliary & Panel）
- **实现约束**：右侧辅助栏（`auxiliaryBar`）与底部输出/终端面板（`panel`）统一使用 `tokens.bg.panel`。
- **设计考量**：辅助面板承载运行时输出、交互终端与辅助信息，其明度在三层空间中最为沉静，形成稳定的内容承托面。

### 2.4 OKLCH 空间的感知推导算法
所有背景色均基于编辑区锚点底色 `bg.editor`（暗色 `#263238` / 亮色 `#ffead8`）在 **OKLCH（Oklab Lightness Chroma Hue）** 色彩空间中进行动态推导，绝不采用生硬的 RGB 线性加减，保证了人眼感知明度（Perceptual Lightness $L$）与色度（Chroma $C$）的平滑过渡。

---

## 三、VS Code Modern UI 连通标签页工程原理解析 (Connected Tabs Engine)

VS Code 引入 Modern UI 后的核心特征之一是 **连通物理标签页（Connected Editor Tabs）**。传统主题直接移植到 Modern UI 下通常会出现严重的视觉断层，Hakimi 提炼并攻克了以下关键机制：

### 3.1 肩部曲线（Connected Shoulder Edge）工作机制
- 活动标签页与编辑区连通不再依靠单纯的方块贴合，而是通过 `.tab-connected-edge` 渲染平滑的内凹圆弧 SVG。
- 该 SVG 依赖两个基础 CSS 变量的明度差：
  - 标签页本体表面色 `--modern-ui-connected-tab-surface`（即 `editor.background`）
  - 标签栏底槽背景色 `--modern-ui-connected-tab-strip-background`（即 `editorGroupHeader.tabsBackground`）

### 3.2 避免四大致命视觉陷阱

| 陷阱类型 | 错误配置示例 | 负面视觉后果 | 规范解法 |
| :--- | :--- | :--- | :--- |
| **泥浆带陷阱**<br>(Muddy Strip Trap) | 将 `editorGroupHeader.connectedTabsBackground` 赋给 `border.subtle` | 连通标签条背景被染成深褐色/暗脏色条，与整个界面割裂。 | 必须与 `editorGroupHeader.tabsBackground` 保持完全一致的 `tokens.bg.chrome`。 |
| **零对比融化**<br>(Zero-Contrast Melt) | 将标签栏背景 `tabsBackground` 设为与编辑器同色（`bg.editor`） | 标签栏与活动标签毫无对比度，肩部曲线失去明度差完全隐形，标签退化为浮空文字。 | 标签栏必须使用外部框架色 `tokens.bg.chrome`，仅活动标签享受 `tokens.bg.editor`。 |
| **横向刀割陷阱**<br>(Horizontal Slash) | 显式指定 `tab.activeBorder` 为某种高亮色彩 | 活动标签与编辑器交界处被一条水平线“硬生生切断”，失去一体化连通感。 | 必须显式将 `tab.activeBorder` 设为 `transparent`。 |
| **双重包围盒**<br>(Double Bounding Box) | 设置 `tab.border` 为实线描边 | 标签页四周出现僵硬的矩形边框，与现代平滑圆角产生突兀的双重边缘冲突。 | 必须显式将 `tab.border` 设为 `transparent`。 |

---

## 四、认知双重编码矩阵：色彩 × 字形 (Cognitive Dual-Coding Matrix)

认知心理学与人机交互研究表明，依赖单一视觉通道（例如仅依赖色相）传递高密度信息极易引起视疲劳，且在色觉障碍、高强环境光或低对比度显示器下鲁棒性极差。

Hakimi 采用 **色彩 × 字形双重编码（Color × Font Style Dual-Coding）**，构建了清晰的四级信息金字塔：

```
                    ┌─────────────────────────┐
                    │  Bold Italic (权威内置)  │  标准库全局对象、权威文档
                    ├─────────────────────────┤
                    │     Bold (控制与骨架)    │  关键字、声明站点、实体类型、常量
                    ├─────────────────────────┤
                    │     Italic (抽象与契约)  │  接口、泛型形参、函数形参、装饰器
                    ├─────────────────────────┤
                    │    Regular (运行时消费)  │  函数调用、局部变量、属性、基础字面量
                    └─────────────────────────┘
```

### 4.1 四级字形定义与职责

#### 1. 粗体 (Bold)：骨架与确定性 (Control & Concrete)
- **视觉心智**：快速扫视代码时最先跳入视野的锚点，构建代码的逻辑拓扑。
- **涵盖要素**：
  - 核心控制流与关键字 (`keyword`, `keyword.control`, `storage.type`)
  - 实体类型定义 (`class`, `struct`, `enum`, `macro`)
  - 声明与定义站点 (`*.declaration`)
  - 不可变常量与只读成员 (`*.readonly`, `property.readonly`)

#### 2. 斜体 (Italic)：抽象契约与元信息 (Abstract & Metadata)
- **视觉心智**：轻盈、富有倾斜流动感，表示“这是一种约定或外部注入的数据，而非具体实现”。
- **涵盖要素**：
  - 抽象接口与协议 (`interface`)
  - 泛型与类型形参 (`typeParameter`)
  - 函数与方法形参 (`parameter`)
  - 上下文代指关键字 (`this`, `self`, `super`)
  - 装饰器与元数据注解 (`decorator`, `annotation`)
  - 异步状态与生命周期 (`*.async`, `lifetime`)
  - 代码行内注释 (`comment`)

#### 3. 粗斜体 (Bold Italic)：核心权威与规范文档 (Authority & Documentation)
- **视觉心智**：厚重且具倾斜姿态，标志着“底层不可篡改的系统级公共设施”。
- **涵盖要素**：
  - 语言核心标准库全局对象 (`*.defaultLibrary`, 如 `Promise`, `Math`, `Array`, `console`)
  - 核心内置类型基类 (`type.defaultLibrary`, `class.defaultLibrary`)
  - 正式 API 规范文档与 Doc 块 (`comment.documentation`, JSDoc/Rustdoc)

#### 4. 常规 (Regular)：运行时数据与日常消费 (Execution & Values)
- **视觉心智**：保持清爽平静的阅读基调，避免界面视觉噪化。
- **涵盖要素**：
  - 普通函数与方法执行调用 (`function`, `method`)
  - 局部变量与成员读取 (`variable`, `property`)
  - 运行时基础字面量 (`string`, `number`, `regex`, `operator`, `punctuation`)

---

## 五、绿色盲可访问性工程与量化标准 (Deuteranopia Engineering)

绿色盲（Deuteranopia）由于视网膜缺少 M 视锥细胞（绿色感知），使得经典的红-绿对抗通道失效。

### 5.1 鉴别轴转向（Shift to Blue-Amber-Magenta Axis）
Hakimi 彻底剔除了以红绿为核心鉴别对立的设计，转而构建正交的 **蓝-琥珀-洋红-青（Blue - Amber - Magenta - Cyan）** 鉴别通道：
- **关键字与流程控制**：品红/紫红色（`#6f1f65` / `#e878cf`），在绿色盲视野中呈现纯净稳健的深蓝紫/灰紫色。
- **函数与操作**：明快纯蓝（`#336fd6` / `#7ab2ff`），在绿色盲视野中属于极高敏感区。
- **类型与抽象**：温暖琥珀金（`#684100` / `#e1be6a`），与蓝色形成冷暖强烈互补。
- **结构体/对象字段与属性 (Property & Attribute)**：专属鸭翅绿/深青（`#00747a` / `#50c0b6`），彻底与变量值和字面量值形成空间隔离。
- **文本与字面量**：深湖蓝与高亮青（`#005b9f` / `#80dcff`）。
- **数值与常量**：橘橙色（`#7a3f00` / `#ff9536`）。
- **运算操作符 (Operator)**：高对比度前景色，与静默背景标点符号（`;`, `,`, `{`）形成清晰动静分流。

### 5.2 严苛量化指标
在代码集成与自动化测试阶段，通过数学模型对所有前景色进行双重验算：
1. **APCA（Advanced Perceptual Contrast Algorithm）字阶感知对比度**：
   - 核心前景字阶对比度 $L_c \ge 60$（实测中正文字符与关键字稳定在 $L_c \ge 70 \sim 82$），保证在任何环境光下均具备极高的可读性。
2. **Brettel 绿色盲模拟色差（$\Delta E_{\text{OK}}$）**：
   - 所有关键相邻语法要素在经过物理级绿色盲色觉模拟后，色差 $\Delta E_{\text{OK}} \ge 0.08$（实测在 $0.10 \sim 0.30$ 之间），杜绝任何可能的色觉坍缩粘连。

---

## 六、两层语法渲染生态：标准 LSP Semantic Tokens 与 TextMate

为了实现跨语言最大公约数与高精度语义的完美融合，Hakimi 严格对齐微软官方与 LSP 3.16+ 规范：

### 6.1 第一层：LSP 官方标准语义标记（Semantic Tokens）
- **覆盖全量 22 种官方标准 Token Types**：
  - 类型与架构：`namespace`, `class`, `enum`, `interface`, `struct`, `type`, `typeParameter`
  - 标识符与状态：`variable`, `property`, `parameter`, `enumMember`, `event`
  - 行为与控制：`function`, `method`, `macro`, `keyword`, `modifier`, `label`
  - 数据与运算：`comment`, `string`, `number`, `regexp`, `operator`
- **支持官方标准 Token Modifiers**：
  - 声明与定义：`*.declaration`, `*.definition`（绑定粗体）
  - 不可变常量：`*.readonly`（绑定只读属性色与粗体）
  - 抽象与异步：`*.abstract`（斜体）、`*.async`（斜体）
  - 平台标准库：`*.defaultLibrary`（系统内置全局，绑定粗斜体）
  - 废弃标记：`*.deprecated`（显式中划线 strikethrough）

### 6.2 第二层：TextMate 官方根作用域层次结构（Root Scopes）
严格覆盖 VS Code 官方语法指南的十大根作用域：
1. `comment.*`：行注释、块注释、文档注释（`comment.block.documentation`）
2. `constant.*`：数值、语言内置字面量（`true`/`null`）、转义与正则
3. `keyword.*`：流程控制、操作符（`keyword.operator`）
4. `storage.*`：存储声明（`var`, `let`, `const`）与修饰符（`static`, `async`）
5. `entity.*`：函数名、类名、接口名、命名空间、HTML 标签与属性
6. `string.*`：常规文本、单双引号、模板字符串
7. `support.*`：系统内置函数、标准库类型、内置变量
8. `variable.*`：局部变量、结构体属性（`variable.other.property`）、入参（`variable.parameter`）、上下文代词（`this`, `self`）
9. `punctuation.*`：分隔符、分号、括号（保持静默中性）
10. `markup.*`：Markdown 标题（粗体）、加粗、斜体、行内代码与链接
11. `invalid.*`：非法标记（报错粗体）与废弃元素（中划线）

---

## 七、Zed Editor Tree-sitter 高精语法捕获与架构设计

根据 Zed 官方扩展规范（[Zed Language Extensions Syntax Highlighting](https://zed.dev/docs/extensions/languages)），Zed 通过 Tree-sitter 查询文件（`highlights.scm`）将 CST（具体语法树）节点映射至主题的捕获项（Captures）。

Hakimi 彻底解除了 Zed 对 Catppuccin 方案的遗留依赖，全量接入 Hakimi 纯语义 Token 系统与色彩 × 字形双重编码矩阵：

### 7.1 官方 43 种标准 Captures 100% 完整覆盖
Zed 主题规范所支持的 43 个核心捕获项均具备明确的语义映射与字阶权重：
- **标识符与变量**：`@variable`（中性正文）、`@variable.parameter`（青色斜体）、`@variable.special`（斜体，`this`/`self`/`super`）、`@constant`（暖橙粗体）、`@constant.builtin`（暖橙粗斜体）
- **函数与方法**：`@function`（亮蓝常规）、`@constructor`（琥珀金粗体）
- **类型与抽象**：`@type`（琥珀金常规）、`@type.builtin`（琥珀金粗斜体）、`@attribute`（鸭翅绿/深青斜体）、`@enum`（琥珀金粗体）、`@property`（鸭翅绿/深青常规，严格隔离于普通变量）
- **关键字与流程**：`@keyword`（紫红粗体）、`@operator`（正文前景色）、`@preproc`（紫红粗体）
- **字面量与正则**：`@string`（深湖蓝/高亮青）、`@string.escape` / `@string.regex`（暖橙常规）、`@string.special`、`@string.special.symbol`、`@number`（暖橙常规）、`@boolean`（暖橙粗体）
- **注释与文档**：`@comment`（静默灰色斜体）、`@comment.doc`（静默灰色粗斜体）
- **标点与分隔**：`@punctuation`、`@punctuation.bracket`、`@punctuation.delimiter`、`@punctuation.list_marker`、`@punctuation.special`（中性灰阶）
- **结构标记与文本**：`@tag`（紫红常规）、`@tag.doctype`（紫红粗体）、`@title`（紫红粗体）、`@emphasis`（斜体）、`@emphasis.strong`（粗体）、`@text.literal`、`@link_text`、`@link_uri`（高亮蓝斜体）
- **状态与衍生**：`@label`（斜体）、`@embedded`、`@hint`、`@predictive`（幽灵斜体灰）、`@primary`、`@variant`（暖橙粗体）

### 7.2 回退捕获机制支持 (Fallback Captures)
Tree-sitter 采用自右向左评估的多重捕获回退机制（例如 `(type_identifier) @type @variable`）。Hakimi 对最细粒度子捕获（如 `variable.member`, `keyword.coroutine`, `function.builtin`）和基捕获（`@variable`, `@type`, `@keyword`）均提供完备且一致的分层定义，确保语言扩展在任意回退层级均能维持正确的色彩对比度与字体形态。

### 7.3 Zed UI 4-Zone 流体空间模型落地
- **Zone 1 (Chrome)**：`title_bar.background == status_bar.background == tab_bar.background == bg.chrome`，形成稳定上下对齐的窗体框架。
- **Zone 2 (SideBar)**：`panel.background == surface.background == bg.sidebar`，主项目管理与大纲面板呈现独立微沉层级。
- **Zone 3 (Auxiliary & Output)**：`editor.subheader.background == elevated_surface.background == terminal.background == bg.panel`，承托控制台与运行时输出。
- **Zone 4 (Editor Canvas)**：`editor.background == tab.active_background == toolbar.background == bg.editor`，活动标签页与编辑区连通为纯净无接缝的编辑主画布。

---

## 八、Obsidian 主题设计与官方 CSS Variables 架构

根据 [Obsidian 官方主题开发规范](https://docs.obsidian.md/Themes/App+themes/Build+a+theme)，Hakimi 全量接入 Obsidian 原生 CSS Variables 架构，彻底剔除 legacy Catppuccin（`ctp-*`）命名与深层 CSS hack，保持选择器低特异性，避免 `!important`：

### 8.1 四层空间流体模型在 Obsidian 中的映射
- **Zone 1 (Chrome)**：`--titlebar-background == --status-bar-background == --ribbon-background == bg.chrome`，窗口外框与底栏保持严格同色。
- **Zone 2 (SideBar)**：`--background-secondary == bg.sidebar`，侧边栏与文件树平滑下沉。
- **Zone 3 (Auxiliary & Floating)**：`--background-modifier-box-shadow == bg.shadow`，`--code-background == bg.panel`。
- **Zone 4 (Editor Canvas)**：`--background-primary == --tab-background-active == bg.editor`，活动标签页与编辑正文区无缝连通，设置 `--tab-outline-color: transparent` 消除双重边框。

### 8.2 官方 12 阶中性色梯（`--color-base-00` ~ `--color-base-100`）
严格实现官方要求由主题定义的基础灰阶序列，在 OKLCH 色彩空间内平滑展开，承托内部层级派生。

### 8.3 绿色盲友好的 Extended Colors 与伴生 `-rgb` 变量
为 `--color-red`, `--color-orange`, `--color-yellow`, `--color-green`, `--color-cyan`, `--color-blue`, `--color-purple`, `--color-pink` 分配绿色盲校准色相，并同步派生 `-rgb` 三通道变量供原生 `rgba()` 调用。

### 8.4 CodeMirror 6 与 Prism 语法双重编码
- 实时预览模式（`.cm-s-obsidian`）与阅读视图（Prism `.token.*`）共享统一的 `--code-*` 变量体系。
- 延续色彩 × 字形双重编码：关键字粗体、注释斜体、对象属性鸭翅绿（Teal，与普通变量完全解耦）。

---

## 九、质量保障与自动化验证体系

所有关于色彩、空间与无障碍的规范，均被固化为自动化检验脚本：

```bash
# 运行完整质量检验流水线
npm run check
```

流水线执行五大核心检查：
1. **VS Code, Zed & Obsidian 4-Zone 背景空间推导检查**：自动验证三端各自的 TitleBar == StatusBar、SideBar 与 Panel 的离散度与明度梯度，以及连通标签页。
2. **零泄漏验证（Zero Leaks）**：遍历生成的 VS Code、Zed 和 Obsidian 主题文件，确保不存在任何 Catppuccin 遗留名称（`ctp-`, `crust`, `mantle`, `surface*` 等）或未对齐的调色板。
3. **Zed Tree-sitter 全量捕获断言**：自动化验证 43 项 Zed 官方捕获项 100% 具备有效十六进制色彩。
4. **Obsidian 官方变量完整性验证**：自动化断言核心官方 Foundations、Chrome 与 Code 变量全部声明覆盖。
5. **APCA 与 $\Delta E_{\text{OK}}$ 数学计算**：实时模拟绿色盲并计算欧氏距离，低于阈值自动报错中断打包。
