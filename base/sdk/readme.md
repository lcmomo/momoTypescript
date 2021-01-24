### 开发一个SDK标准

#### 规范： 
1. 最少原则 尽量减少依赖，多扩展
2. 专注于某个领域
3. 足够稳定（breakchange）
4. Hook 机制， （热插拔）

#### 础架构

1. sdk  模块化标准

    - amd
    - cmd
    - es module
    - commonJs

2. SDK 版本

    - GitHub 
        - 源码不发布dist
    - npm
        - 版本（1.1.1 ： 主.次.修 -》 major.minor.patch）

3. 开发架构模式
    - 职责单一
    - base（核心） + plugins + Biz（应用层）
4. 测试
    - 单元测试
    - E2E测试
    - 测试覆盖率

5. 客户体验

    - 一行代码侵入式
    - 自我诊断
    - 动态采样机制
    - 图文并茂的文档

6. 构建工具

    - swc
    - Roullup
    - EsBuild
    - microbundle

    edex-ui