# Hakimi Deuteranopia Safe

> 面向绿色盲（Deuteranopia）与高认知效率编码场景的现代专业色彩体系。支持 VS Code、Zed、Obsidian 以及标准 JS / CSS / SCSS / Less 配色库。

📖 **完整设计哲学与工程规范文档**：详见 [docs/DESIGN_SPECIFICATION.md](docs/DESIGN_SPECIFICATION.md)。

---

## 核心设计特性

### 1. 纯语义设计 Token 驱动（Zero-Palette Architecture）
彻底摒弃传统主题对第三方调色板（如 Catppuccin 等）的硬编码依赖，建立面向功能的三层纯语义 Token 树：
- **`bg.*`**：工作区空间流体明度（`editor`, `chrome`, `sidebar`, `panel`, `canvas`）
- **`fg.*`**：信息密度前景色（`default`, `muted`, `subtle`）
- **`border.*`**：界面边界控制（`subtle`, `strong`, `focus`）
- **`intent.*`**：系统意图提示（`info`, `success`, `warning`, `danger`）
- **`syntax.*`**：语法角色正交分流（`keyword`, `function`, `type`, `property`, `parameter`, `string`, `number`, `constant`, `operator`, `punctuation`）

---

### 2. 工作区四层空间流体明度模型 (Four-Zone Spatial Model)
以主编辑区画布（`bg.editor`，暗色 `#263238` / 亮色 `#ffead8`）为基准锚点，在 **OKLCH 感知色彩空间** 中精确派生四层物理纵深：

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

1. **顶底框架严格同色（Top-Bottom Chrome Harmony）**：`TitleBar` 与 `StatusBar` 统一使用 `bg.chrome`，构建沉浸式装配外框。
2. **主侧边栏独立分层（Primary SideBar）**：独立派生色 `bg.sidebar`，清晰界定工作区与文件树边界。
3. **辅助面板与抽屉（Panel & Auxiliary Bar）**：右侧辅助栏与底部终端/输出面板统合为 `bg.panel`。
4. **VS Code Modern UI 连通标签页完美接合**：
   - 活动标签通过 SVG 肩部曲线（`.tab-connected-edge`）与编辑器画布一体连通；
   - 标签栏底槽平滑融入 `bg.chrome`；
   - 彻底消灭传统主题在 Modern UI 下的“泥浆带背景”与“双重边框冲突”。

---

### 3. 结构键与数据值彻底正交隔离（Key-Value Dichotomy）
在对象字面量、结构体与 HTML 属性中，严格贯彻“键（Schema）与值（Payload）异色”原则：
- **字段/属性名（`property`, `attribute`）**：专属鸭翅绿/深青（暗色 `#50c0b6` / 亮色校准为 `#00747a`），一眼识别结构键槽。
- **局部变量（`variable`）**：保持稳定耐看的中性文本色（`textDefault`）。
- **字面量值（`string`, `number`）**：分别采用独立的高饱和湖蓝与橘橙色。
- **运算操作符（`operator`）**：提升为显式前景色，与静默背景标点符号（`;`, `,`, `{`）形成明确的动静分界。

```typescript
// 键值分流示例（扫视即可区分键与值，无需依赖冒号）：
const user = {
  name: userName,       // name (属性色) vs userName (中性变量色)
  age: 28,              // age (属性色) vs 28 (数字字面量色)
  role: Role.Admin,     // role (属性色) vs Admin (只读常量粗体)
};
```

---

### 4. 色彩 × 字形双重编码认知矩阵 (Color × Font Style Dual-Coding)

| 字形维度 | 认知角色 | 对应 LSP / TextMate 语法角色 |
| :--- | :--- | :--- |
| **粗体 (Bold)** | **骨架与确定性**<br>(Control & Concrete) | • 流程控制与关键字 (`keyword`, `keyword.control`, `storage.type`)<br>• 实体定义声明 (`class`, `struct`, `enum`, `macro`)<br>• 显式声明站点 (`*.declaration`, `*.definition`)<br>• 不可变常量与只读成员 (`*.readonly`, `property.readonly`, `enumMember`) |
| **斜体 (Italic)** | **抽象契约与元信息**<br>(Abstract & Metadata) | • 抽象接口与协议 (`interface`, `class.abstract`)<br>• 泛型与类型参数 (`typeParameter`)<br>• 函数与方法入参 (`parameter`)<br>• 上下文代指 (`this`, `self`, `super`)<br>• 装饰器与注解 (`decorator`, `annotation`)<br>• 异步修饰 (`*.async`)、常规注释 (`comment`) |
| **粗斜体 (Bold Italic)** | **核心权威与规范文档**<br>(Authority & Documentation) | • 语言平台核心内置标准库 (`*.defaultLibrary`, 如 `Promise`, `Math`, `Array`, `console`)<br>• 核心内置基类 (`class.defaultLibrary`, `type.defaultLibrary`)<br>• 规范 API 文档块 (`comment.documentation`, JSDoc/Rustdoc) |
| **常规 (Regular)** | **运行时数据与常规调用**<br>(Execution & Values) | • 普通函数/方法执行调用 (`function`, `method`)<br>• 局部变量与成员读取 (`variable`)<br>• 结构字段取值 (`property`)<br>• 基础数据字面量 (`string`, `number`, `regexp`, `operator`) |

---

### 5. LSP Semantic Tokens (22 类) 与 TextMate 全量标准覆盖

- **LSP 3.16+ 官方 22 个标准 Token Types 100% 完整覆盖**：  
  `namespace`, `class`, `enum`, `interface`, `struct`, `type`, `typeParameter`, `variable`, `property`, `parameter`, `enumMember`, `event`, `function`, `method`, `macro`, `keyword`, `modifier`, `label`, `comment`, `string`, `number`, `regexp`, `operator`。
- **LSP 官方标准 Modifiers 支持**：  
  `declaration`, `definition`, `readonly`, `abstract`, `async`, `defaultLibrary`, `documentation`, `deprecated` (绑定 `strikethrough`)。
- **TextMate 10 大标准根作用域全量兜底**：  
  `comment.*`, `constant.*`, `keyword.*`, `storage.*`, `entity.*`, `string.*`, `support.*`, `variable.*`, `punctuation.*`, `markup.*`, `invalid.*`。

---

### 6. 绿色盲（Deuteranopia）可访问性量化工程

所有前景色与背景色组合在编译阶段通过真实数学模型双重严苛断言：
1. **APCA（Advanced Perceptual Contrast Algorithm）**：所有语法与文字在编辑器底色上的感知对比度 $L_c \ge 45$（正文字符与关键字稳定维持在 $L_c \ge 60 \sim 82$）。
2. **Brettel 绿色盲色差模拟**：相邻语法角色在物理级绿色盲色觉模拟后，色差全量满足 $\Delta E_{\text{OK}} \ge 0.100$（远超 $\ge 0.08$ 警戒线），彻底根除传统红绿对立与暗调坍缩。

---

## 项目结构

```text
src/
  tokens/               纯语义设计 Token 体系（核心权威源）
    primitives.mjs      编辑器底色锚点、中性灰阶与绿色盲安全色板
    derivation.mjs      OKLCH 空间的四层工作区空间感知派生算法
    semanticTokens.mjs  3-Tier 语义 Token 工厂（bg, fg, border, intent, syntax）
    index.mjs           主题 Token 统一入口
  vscode/               VS Code 官方标准映射引擎
    workbenchColors.mjs 工作区 UI、Modern UI 连通标签页与组件配色
    syntaxHighlighting.mjs LSP 22 类语义高亮与 TextMate 标准语法树
    index.mjs           VS Code 主题生成器
  colors.mjs            感知色彩空间转换、APCA 计算与 Brettel 绿色盲仿真
scripts/
  build.mjs             全生态产物生成器（VS Code, Zed, Obsidian, npm 配色库）
  verify-tokens.mjs     自动化测试套件（4-Zone 规则、零遗漏、APCA、ΔE_OK 验算）
  package-vscode.mjs    锁定版 VSCE 本地打包流水线
docs/
  DESIGN_SPECIFICATION.md 项目完整设计哲学、数学模型与架构规范文档
artifacts/              打包生成的 VSIX 扩展包与归档文件
```

---

## 常用开发指令

```sh
npm run build          # 编译所有生态产物（VS Code, Zed, Obsidian, CSS/SCSS/Less）
npm test               # 执行产物验证与自动化无障碍断言
npm run check          # 全量验证流水线（构建 + 测试 + Biome 代码风格检查）
npm run package:vscode # 打包生成 artifacts/hakimi-deutan-theme-2.0.0.vsix
```

### 安装至 VS Code
1. 在 VS Code 扩展面板点击菜单 `...` -> **“从 VSIX 安装...”** (Install from VSIX)；
2. 选择 `artifacts/hakimi-deutan-theme-2.0.0.vsix`；
3. 打开命令面板（`Ctrl+Shift+P`）运行 **`Preferences: Color Theme`**，选择 **Hakimi Deuteranopia Dark** 或 **Hakimi Deuteranopia Light**。

---

## License

[MIT](LICENSE)
